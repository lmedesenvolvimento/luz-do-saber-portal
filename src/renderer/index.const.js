export const TOTAL_COLUMNS = 12

export const ACTIVITY_LIST = JSON.parse(`
{
    "id": 1,
    "module_id": 1,
    "theme_id": 1,
    "unit_id": 1,
    "module": {
        "id": 1,
        "slug": "comecar",
        "title": "Começar",
        "order": 1
    },
    "theme": {
        "id": 1,
        "slug": "meu-nome",
        "title": "Meu Nome",
        "order": 1
    },
    "unit": {
        "id": 1,
        "slug": "meu-nome",
        "title": "Meu Nome",
        "order": 1
    },
    "type": {
        "id": 1,
        "title": "Atividade - Texto",
        "slug": "atividade-texto"
    },
    "total_correct_items": 1,
    "title": {
        "type": "text",
        "text": "CRACHÁ",
        "image": null,
        "audio": null
    },
    "statement": {
        "type": "text",
        "text": "ENCONTRE O CRACHÁ QUE TEM SEU NOME",
        "image": null,
        "audio": null
    },
    "item_template": {
        "key": {
            "total_per_line": 0,
            "tags": null
        },
        "value": {
            "type": "texto",
            "content_position": "center",
            "name": "Componente de Texto",
            "slug": "componente-de-texto",
            "total_per_line": 3,
            "tags": "cracha-box"
        }
    },
    "items": {
        "keys": [
            {
                "id": 1,
                "type": "substantivo_proprio",
                "text": "AMANDA",
                "first_letter": "A",
                "last_letter": "A",
                "total_letters": 6,
                "value_ids": [2],
                "letras": [
                    {
                        "type": "letra",
                        "text": "M",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "N",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "D",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "MAN",
                        "total_letters": 3
                    },
                    {
                        "type": "silaba",
                        "text": "DA",
                        "total_letters": 2
                    }
                ]
            }
        ],
        "values": [
            {
                "id": 2,
                "key_id": 1,
                "type": "substantivo_proprio",
                "text": "AMANDA",
                "first_letter": "A",
                "last_letter": "A",
                "total_letters": 6,
                "letras": [
                    {
                        "type": "letra",
                        "text": "M",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "N",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "D",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "MAN",
                        "total_letters": 3
                    },
                    {
                        "type": "silaba",
                        "text": "DA",
                        "total_letters": 2
                    }
                ]
            },
            {
                "id": 3,
                "key_id": null,
                "type": "substantivo_proprio",
                "text": "BIANCA",
                "first_letter": "B",
                "last_letter": "A",
                "total_letters": 6,
                "letras": [
                    {
                        "type": "letra",
                        "text": "B",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "I",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "N",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "C",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "BI",
                        "total_letters": 2
                    },
                    {
                        "type": "silaba",
                        "text": "AN",
                        "total_letters": 2
                    },
                    {
                        "type": "silaba",
                        "text": "CA",
                        "total_letters": 2
                    }
                ]
            },
            {
                "id": 4,
                "key_id": null,
                "type": "substantivo_proprio",
                "text": "CARLA",
                "first_letter": "C",
                "last_letter": "A",
                "total_letters": 5,
                "letras": [
                    {
                        "type": "letra",
                        "text": "C",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "R",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "L",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "CAR",
                        "total_letters": 3
                    },
                    {
                        "type": "silaba",
                        "text": "LA",
                        "total_letters": 2
                    }
                ]
            },
            {
                "id": 5,
                "key_id": null,
                "type": "substantivo_proprio",
                "text": "DÉBORA",
                "first_letter": "D",
                "last_letter": "A",
                "total_letters": 6,
                "letras": [
                    {
                        "type": "letra",
                        "text": "D",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "E",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "B",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "O",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "R",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "DÉ",
                        "total_letters": 2
                    },
                    {
                        "type": "silaba",
                        "text": "BO",
                        "total_letters": 2
                    },
                    {
                        "type": "silaba",
                        "text": "RA",
                        "total_letters": 2
                    }
                ]
            },
            {
                "id": 6,
                "key_id": null,
                "type": "substantivo_proprio",
                "text": "ERIKA",
                "first_letter": "E",
                "last_letter": "A",
                "total_letters": 5,
                "letras": [
                    {
                        "type": "letra",
                        "text": "R",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "I",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "K",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "RI",
                        "total_letters": 2
                    },
                    {
                        "type": "silaba",
                        "text": "KA",
                        "total_letters": 2
                    }
                ]
            },
            {
                "id": 7,
                "key_id": null,
                "type": "substantivo_proprio",
                "text": "FERNANDA",
                "first_letter": "F",
                "last_letter": "A",
                "total_letters": 8,
                "letras": [
                    {
                        "type": "letra",
                        "text": "F",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "E",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "R",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "N",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "N",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "D",
                        "total_letters": 1,
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "total_letters": 1,
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],
                "silabas": [
                    {
                        "type": "silaba",
                        "text": "FER",
                        "total_letters": 3
                    },
                    {
                        "type": "silaba",
                        "text": "NAN",
                        "total_letters": 3
                    },
                    {
                        "type": "silaba",
                        "text": "DA",
                        "total_letters": 2
                    }
                ]
            }
        ]
    }
}
`)
