import Card from "./interface.ts";

export var cards: Card[] = [];


export default {

    getAllCards: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            data: cards,
        }
    },
    createCard: async ({ request, response }: { request: any, response: any },) => {
        const body = await request.body();
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }

        const values = await body.value;
        let newCard: Card = {
            id: values.id,
            title: values.title,
            description: values.description,
            tab: values.tab,
        };
        cards.push(newCard);

        let data = [...cards];
        response.body = {
            success: true,
            data,
        };
    },
    deleteCardById: ({ params, response }: { params: { id: string }; response: any }) => {
        cards = cards.filter(card => card.id !== params.id);
        response.status = 200;
        response.body = {
            success: true,
            data: cards,
        };
    },
};