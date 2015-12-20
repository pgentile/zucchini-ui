package example

import org.slf4j.Logger
import org.slf4j.LoggerFactory

class Logging {

    private static final Logger LOGGER = LoggerFactory.getLogger(Logging.class);

    void debug(GString message) {
        if (LOGGER.debugEnabled) {
            LOGGER.debug(message)
        }
    }

    void debug(String message) {
        LOGGER.debug(message)
    }

    void info(GString message) {
        if (LOGGER.infoEnabled) {
            LOGGER.info(message)
        }
    }

    void info(String message) {
        LOGGER.info(message)
    }

}
