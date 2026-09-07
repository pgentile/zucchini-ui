package io.zucchiniui.backend.support.server;

import com.codahale.metrics.MetricRegistry;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeName;
import io.dropwizard.core.server.DefaultServerFactory;
import io.dropwizard.metrics.jetty12.InstrumentedQueuedThreadPool;
import org.eclipse.jetty.util.BlockingArrayQueue;
import org.eclipse.jetty.util.thread.ThreadPool;

/**
 * Variant of {@link DefaultServerFactory} that bounds the size of the Jetty request queue.
 *
 * <p>Dropwizard 5 removed the {@code maxQueuedRequests} setting (the underlying Jetty thread pool
 * queue is now built with an unbounded {@link BlockingArrayQueue}), which can let an unlimited
 * number of requests pile up in memory under load. This factory restores an equivalent bound.
 */
@JsonTypeName("default-bounded")
public class BoundedDefaultServerFactory extends DefaultServerFactory {

    private int maxQueuedRequests = 2048;

    @JsonProperty
    public int getMaxQueuedRequests() {
        return maxQueuedRequests;
    }

    @JsonProperty
    public void setMaxQueuedRequests(final int maxQueuedRequests) {
        this.maxQueuedRequests = maxQueuedRequests;
    }

    @Override
    protected ThreadPool createThreadPool(final MetricRegistry metricRegistry) {
        final BlockingArrayQueue<Runnable> queue = BlockingArrayQueue.newInstance(getMinThreads(), maxQueuedRequests);
        final InstrumentedQueuedThreadPool threadPool = new InstrumentedQueuedThreadPool(
            metricRegistry,
            getMaxThreads(),
            getMinThreads(),
            (int) getIdleThreadTimeout().toMilliseconds(),
            queue
        );
        if (isEnableVirtualThreads()) {
            threadPool.setVirtualThreadsExecutor(new org.eclipse.jetty.util.thread.VirtualThreadPool(getMaxThreads()));
        }
        threadPool.setName("dw");
        return threadPool;
    }
}
