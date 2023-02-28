package io.zucchiniui.backend.presence.websocket;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = OtherWatchersResponse.class, name = "OTHER_WATCHERS"),
    @JsonSubTypes.Type(value = RefreshMessageRequest.class, name = "REFRESH")
})
public abstract class PresenceMessage {

}
