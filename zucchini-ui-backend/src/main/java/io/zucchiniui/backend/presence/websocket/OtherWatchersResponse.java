package io.zucchiniui.backend.presence.websocket;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Set;

public class OtherWatchersResponse extends PresenceMessage {

    private final Set<String> watcherIds;

    @JsonCreator
    public OtherWatchersResponse(
        @JsonProperty("watcherIds") final Set<String> watcherIds) {
        this.watcherIds = watcherIds;
    }

    public Set<String> getWatcherIds() {
        return watcherIds;
    }

}
