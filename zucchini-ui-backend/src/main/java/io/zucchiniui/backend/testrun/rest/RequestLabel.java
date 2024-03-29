package io.zucchiniui.backend.testrun.rest;

import org.hibernate.validator.constraints.URL;

import jakarta.validation.constraints.NotEmpty;

public record RequestLabel(@NotEmpty String name, @NotEmpty String value, @URL String url) {

}
