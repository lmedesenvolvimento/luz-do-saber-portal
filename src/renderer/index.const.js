export const TOTAL_COLUMNS = 12

export const ACTIVITY_LIST = JSON.parse(`{
    "type": "lista",
    "subtype": "itens_corretos",

    "id": 1,
    "order": 1,

    "module_id": 1,
    "theme_id": 1,
    "unity_id": 1,

    "module": {
        "id": 1,
        "name": "Começar",
        "slug": "comecar"
    },

    "theme": {
        "id": 1,
        "name": "Começar",
        "slug": "comecar"
    },

    "unity": {
        "id": 1,
        "name": "Meu Nome",
        "slug": "meu-nome"
    },

    "title": {
        "type": "texto",
        "text": "Crachá",
        "audios": []
    },

    "statement": {
        "type": "texto",
        "text": "Encontre o crachá que tem seu nome.",
        "audios": [{ "url": "1.mp4" }]
    },

    "total_corrects": 1,

    "item_template": {
        "key": {},
        "value": {
            "type": "imagem",
            "subtype": "texto",
            "total_per_line": 3,
            "colorized": false,
            "background_image": "cracha.jpg",
            "text_position": "bottom"
        }
    },

    "items": {
        "keys": [],
        "values": [
            {
                "is_correct": false,

                "type": "substantivo-proprio",

                "text": "CARMEN",
                "total_letters": 6,
                "first_letter": "C",
                "last_letter": "N",

                "letters": [
                    {
                        "type": "letra",
                        "text": "C",
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "R",
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "M",
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "E",
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "N",
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],

                "images": [],
                "audios": [{ "url": "carmen.mp4" }]
            },

            {
                "is_correct": true,

                "type": "substantivo-proprio",
                "text": "MAXI",

                "total_letters": 4,
                "first_letter": "M",
                "last_letter": "I",

                "letters": [
                    {
                        "type": "letra",
                        "text": "M",
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "A",
                        "is_vowel": true,
                        "is_consonant": false
                    },
                    {
                        "type": "letra",
                        "text": "X",
                        "is_vowel": false,
                        "is_consonant": true
                    },
                    {
                        "type": "letra",
                        "text": "I",
                        "is_vowel": true,
                        "is_consonant": false
                    }
                ],

                "images": [],
                "audios": [{ "url": "maxi.mp4" }]
            }
        ]
    }
}`)
