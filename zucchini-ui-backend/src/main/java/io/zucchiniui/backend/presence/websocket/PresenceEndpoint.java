package io.zucchiniui.backend.presence.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.shared.domain.ItemReferenceType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
@ServerEndpoint("/ws/presence")
public class PresenceEndpoint {

    private enum CustomCloseCode implements CloseReason.CloseCode {

        UNEXPECTED_ERROR(4000);

        private final int code;

        CustomCloseCode(int code) {
            this.code = code;
        }

        @Override
        public int getCode() {
            return code;
        }

    }

    private static final Logger LOGGER = LoggerFactory.getLogger(PresenceEndpoint.class);

    private static final String REFERENCE_USER_PROP = "reference";

    private static final String WATCHER_ID_USER_PROP = "watcherId";

    private final ObjectMapper objectMapper;

    private Session session;

    private ItemReference reference;

    public PresenceEndpoint(final ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @OnOpen
    public void onOpen(final Session session) {
        LOGGER.debug("Socket opened for session {}", session.getId());

        // Endpoint setup
        this.session = session;
        reference = createReference();

        // Session setup
        final String watcherId = getRequestParam("watcherId");
        session.getUserProperties().put(REFERENCE_USER_PROP, reference);
        session.getUserProperties().put(WATCHER_ID_USER_PROP, watcherId);

        // FIXME Setting timeout with Jetty implementation doesn't work
        // session.setMaxIdleTimeout(TimeUnit.MILLISECONDS.toSeconds(20));

        // Refresh watcher list to all sessions
        final List<Session> sessions = findSessionsWithSameReference();
        final Set<String> allWatcherIds = getAllWatcherIds(sessions);
        sessions.forEach(someSession -> sendWatchersToSession(someSession, allWatcherIds));
    }

    @OnMessage
    public void onMessage(final String data) {
        LOGGER.debug("Session {} - Received '{}'", session.getId(), data);

        final PresenceMessage message = decodeMessage(data);
        if (message instanceof RefreshMessageRequest) {
            onRefreshRequest();
        } else {
            LOGGER.warn("Unknown message: {}", message);
        }
    }

    @OnClose
    public void onClose(final CloseReason closeReason) {
        LOGGER.debug("Session {} -  Closed because of {}", session.getId(), closeReason);

        final List<Session> otherSessionsWithSameReference = findSessionsWithSameReference(someSession -> someSession != session);
        final Set<String> allWatcherIds = getAllWatcherIds(otherSessionsWithSameReference);
        otherSessionsWithSameReference.forEach(someSession -> sendWatchersToSession(someSession, allWatcherIds));
    }

    @OnError
    public void onError(final Throwable e) throws IOException {
        LOGGER.error("Session {} - Got an error", session.getId(), e);
        session.close(new CloseReason(CustomCloseCode.UNEXPECTED_ERROR, e.getClass().getSimpleName()));
    }

    private void onRefreshRequest() {
        final List<Session> sessions = findSessionsWithSameReference();
        final Set<String> allWatcherIds = getAllWatcherIds(sessions);
        sendWatchersToSession(session, allWatcherIds);
    }

    private List<Session> findSessionsWithSameReference(final Predicate<Session> sessionFilter) {
        // A bug on getOpenSessions() doesn't return the newly opened session with @OnOpen method
        return Stream.concat(Stream.of(session), session.getOpenSessions().stream())
            .distinct()
            .filter(someSession -> reference.equals(someSession.getUserProperties().get(REFERENCE_USER_PROP)))
            .filter(Session::isOpen)
            .filter(sessionFilter)
            .toList();
    }

    private List<Session> findSessionsWithSameReference() {
        return findSessionsWithSameReference(someSession -> true);
    }

    private ItemReference createReference() {
        final ItemReferenceType type = ItemReferenceType.valueOf(getRequestParam("type"));
        final String refValue = getRequestParam("reference");
        return type.createReference(refValue);
    }

    private String getRequestParam(final String name) {
        final List<String> values = session.getRequestParameterMap().get(name);
        if (values == null || values.size() == 0) {
            throw new IllegalArgumentException("Request param " + name + " not defined");
        }
        return values.get(0);
    }

    private void sendWatchersToSession(final Session session, final Set<String> allWatcherIds) {
        final Set<String> watcherIdsToSubmit = new HashSet<>(allWatcherIds);
        final String sessionWatcherId = (String) session.getUserProperties().get(WATCHER_ID_USER_PROP);
        watcherIdsToSubmit.remove(sessionWatcherId);

        final OtherWatchersResponse message = new OtherWatchersResponse(watcherIdsToSubmit);
        final String data = encodeMessage(message);

        session.getAsyncRemote().sendText(data, result -> {
            if (!result.isOK()) {
                LOGGER.error("Error writing to session {}", session.getId(), result.getException());
            }
        });
    }

    private PresenceMessage decodeMessage(final String data) {
        try {
            return objectMapper.readValue(data, PresenceMessage.class);
        } catch (final IOException e) {
            throw new RuntimeException("Can't read request message", e);
        }
    }

    private String encodeMessage(final PresenceMessage message) {
        try {
            return objectMapper.writeValueAsString(message);
        } catch (final JsonProcessingException e) {
            throw new RuntimeException("Can't encode message " + message, e);
        }
    }

    private static Set<String> getAllWatcherIds(final Collection<Session> sessions) {
        return sessions.stream()
            .map(someSession -> (java.lang.String) someSession.getUserProperties().get(WATCHER_ID_USER_PROP))
            .collect(Collectors.toSet());
    }

}
