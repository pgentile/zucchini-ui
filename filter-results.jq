# Execution : jq -f {{script.jq}} doc.json

[
    .[] | {
        feature: [ .keyword, .name ] | join(" : "),
        tags: [ .tags[].name ],
        scenarios: [
            .elements[] | {
                scenario: [ .keyword, .name ] | join(" : "),
                type: .type,
                steps: [
                    .steps[] | {
                        step: [ .keyword, .name ] | join(" : "),
                        status: .result.status
                    }
                ],
                tags: [ .tags[].name ]
            }
        ]
    }
]
