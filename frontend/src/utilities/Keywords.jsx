

// This generates a list of keywords that will populate the dropdown menu
// for users to select when creating a new Experience. We can add as many
// keywords as we see fit. Limiting keywords to only being chosen from a
// list makes searching much easier, as it limits the possibility of typos.

export function getKeywords() {

    const keywords = [
        "beach", "swimming", "hiking", "wildlife", "food", "music",
        "family-friendly", "pet-friendly", "romantic", "adventure",
        "relaxing"
    ]

    return keywords;
}