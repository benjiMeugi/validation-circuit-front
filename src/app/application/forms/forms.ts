import { formSideParams, Iform, InputType } from "src/app/core/form-module/dynamic-form/dynamic-form.component";
import { apiRoutes } from "../routing/api-routes";

export const patterns = {
    onlyNumbers: /^-?(0|[1-9]\d*)?$/,
    // onlyNumbers: "[0-9]\d*",
};

export const formIds = {
    testFormId: 0,
    data: 1,
}

export const forms: Iform[] = [
    {
        id: formIds.testFormId,
        controls: [
            {
                index: 1,
                label: "NOM",
                name: "hid",
                type: InputType.HIDDEN,
                rules: [],
                containerClass: 'clr-col-6'
            },
            {
                index: 1,
                label: "NOM",
                name: "firstname",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true },
                    { rule: 'minLength', value: 2 },
                ],
                containerClass: 'clr-col-6'
            },
            // {
            //     index: 1,
            //     label: "TRAVAUX",
            //     name: "travaux",
            //     type: InputType.SELECT,
            //     rules: [
            //         { rule: 'required', value: true },
            //     ],
            //     items: [],
            //     remote: { url: apiRoutes.brands, fields: { label: 'label', value: 'id' } },
            //     containerClass: 'clr-col-6'
            // },
            {
                index: 2,
                label: "Prenom",
                name: "lastname",
                rules: [],
                type: InputType.TEXT,
                containerClass: 'clr-col-3',
                patterns: [patterns.onlyNumbers],
            },
            {
                index: 2,
                label: "E-mail",
                name: "email",
                value: "d",
                rules: [],
                type: InputType.EMAIL,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 2,
                label: "Mot de passe",
                name: 'password',
                rules: [],
                value: "s",
                type: InputType.PASSWORD,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 2,
                label: "Sexe",
                name: "sex",
                items: [
                    { value: "M", label: "MASCULIN" },
                    { value: "F", label: "FEMININ" },
                ],
                rules: [],
                type: InputType.RADIO,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 2,
                label: "CATEGORIE",
                name: "categorie",
                items: [
                    { value: false, label: "BEBE", name: "B" },
                    { value: false, label: "JEUNE", name: "J" },
                    { value: false, label: "ADULTE", name: "A" },
                ],
                rules: [{ rule: 'required', value: true },],
                type: InputType.CHECKBOX,
                containerClass: 'clr-col-3',
                patterns: [],
            },
            {
                index: 3,
                label: "Age",
                name: "age",
                type: 'number',
                rules: [{ rule: 'required', value: true },],
                containerClass: 'clr-col-3',
                patterns: [patterns.onlyNumbers],
            },
            {
                index: 4,
                label: "Commentaire",
                name: "comment",
                type: InputType.TEXTAREA,
                rules: [],
                containerClass: 'clr-col-12',
                patterns: [],
            },
            {
                index: 4,
                label: "DATE",
                name: "date",
                type: InputType.DATE,
                rules: [
                    { rule: 'required', value: true },
                ],
                containerClass: 'clr-col-12',
                patterns: [],
            },
            {
                index: 5,
                label: "s",
                type: InputType.ARRAY,
                name: "F",
                rules: [],
                containerClass: 'clr-col-12',
                childreen: [
                    {
                        index: 1,
                        label: "rep NOM",
                        name: "nom",
                        type: InputType.TEXT,
                        rules: [{ rule: 'required', value: true },],
                        containerClass: 'clr-col-6'
                    },
                    {
                        index: 2,
                        label: "rep pren",
                        name: "pren",
                        type: InputType.TEXT,
                        rules: [],
                        containerClass: 'clr-col-6'
                    },
                ]
            }
        ]
    },
    {
        id: formIds.data,
        controls: [
            {
                index: 1,
                label: "LIBELLE",
                name: "label",
                type: InputType.TEXT,
                rules: [
                    { rule: 'required', value: true }
                ],
                containerClass: 'clr-col-12'
            },
            {
                index: 2,
                label: "DESCRIPTION",
                name: "description",
                type: InputType.TEXTAREA,
                rules: [{ rule: 'required', value: true }],
                containerClass: 'clr-col-12'
            },
            {
                index: 3,
                label: "Documents",
                name: "doc",
                type: InputType.FILE,
                rules: [{ rule: 'required', value: true }],
                containerClass: 'clr-col-12'
            },
            {
                index: 4,
                label: "VALIDATEURS",
                name: "validators",
                type: InputType.ARRAY,
                rules: [],
                containerClass: 'clr-col-12',
                // multiple: true,
                // items: [],
                childreen: [
                    {
                        index: 1,
                        label: "VALIDATEUR",
                        name: "user_id",
                        type: InputType.SELECT,
                        rules: [{ rule: 'required', value: true }],
                        containerClass: 'clr-col-6',
                        items: [],
                        remote: { url: apiRoutes.user, fields: { label: 'name', value: 'id' } },
                    },
                    {
                        index: 2,
                        label: "PRIORITE",
                        name: "priority",
                        type: InputType.NUMBER,
                        rules: [{ rule: 'required', value: true }],
                        containerClass: 'clr-col-6',
                    },
                ]
            },
        ]
    }
];