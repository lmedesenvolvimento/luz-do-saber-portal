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
                "custom": null,
                "tags": null
            },
            "value": {
                "type": "texto",
                "name": "Componente de Texto",
                "slug": "componente-de-texto",
                "total_per_line": 3,
                "custom": "cracha-box",
                "tags": null
            }
        },
        "items": {
            "keys": [
                {
                    "id": 1,
                    "value_ids": [
                        2
                    ],
                    "type": "substantivo_proprio",
                    "text": "AMANDA",
                    "first_letter": "A",
                    "last_letter": "A",
                    "total_letters": 6
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
                    "total_letters": 6
                },
                {
                    "id": 3,
                    "key_id": null,
                    "type": "substantivo_proprio",
                    "text": "BIANCA",
                    "first_letter": "B",
                    "last_letter": "A",
                    "total_letters": 6
                },
                {
                    "id": 4,
                    "key_id": null,
                    "type": "substantivo_proprio",
                    "text": "CARLA",
                    "first_letter": "C",
                    "last_letter": "A",
                    "total_letters": 5
                },
                {
                    "id": 5,
                    "key_id": null,
                    "type": "substantivo_proprio",
                    "text": "DÉBORA",
                    "first_letter": "D",
                    "last_letter": "A",
                    "total_letters": 6
                },
                {
                    "id": 6,
                    "key_id": null,
                    "type": "substantivo_proprio",
                    "text": "ERIKA",
                    "first_letter": "E",
                    "last_letter": "A",
                    "total_letters": 5
                },
                {
                    "id": 7,
                    "key_id": null,
                    "type": "substantivo_proprio",
                    "text": "FERNANDA",
                    "first_letter": "F",
                    "last_letter": "A",
                    "total_letters": 8
                }
            ]
        }
    }
`)
