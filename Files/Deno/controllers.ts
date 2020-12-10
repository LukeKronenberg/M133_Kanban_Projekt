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
            id: values._Id,
            tab: values._Tab,
            title: values._Title,
            description: values._Description,
        };
        console.log(values);
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
    updateCardById: async (
        { params, request, response }: {
            params: { id: string },
            request: any,
            response: any,
        }
    ) => {
        const card: Card | undefined = cards.find(c => c.id === params.id);
        if (!card) {
            response.status = 404;
            response.body = {
                success: false,
                message: "Card not found",
            };
            return;
        }

        const body = await request.body();
        console.log(await body.value);
        let values = await body.value;
        let updatedCard: Card = {
            id: values._Id,
            tab: values._Tab,
            title: values._Title,
            description: values._Description,
        };
        console.log(updatedCard);
        let newCards = cards.map(c => {
            if (c.id === params.id) {
                c.tab = updatedCard.tab;
            }
        });
        console.log(cards);
        response.status = 200;
        response.body = {
            success: true,
            data: newCards,
        };
    },
};