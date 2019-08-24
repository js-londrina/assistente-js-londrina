// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const axios = require('axios');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Eu sou a assistente do grupo Javascript Londrina, como posso ajudar?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const DescriptionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescriptionIntent';
    },
    async handle(handlerInput) {
        const { data } = await axios.get('http://js-londrina.github.io/community_data.json')
        const answer = `${data.description}. Posso ajudar com algo mais?`;
        return handlerInput.responseBuilder
            .speak(answer)
            .reprompt('ajuda')
            .getResponse();
    }
};
//`no dia ${new Date(b.start.dateTime).getDate()} do ${new Date(b.start.dateTime).getMonth()+1} vai ter o evento ${b.summary} no ${b.location}`
const EventsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EventsIntent';
    },
    async handle(handlerInput) {
        // const eventsCalendar = "https://clients6.google.com/calendar/v3/calendars/26tbnscf1he8hikscosvhbk4ck@group.calendar.google.com/events?calendarId=26tbnscf1he8hikscosvhbk4ck%40group.calendar.google.com&singleEvents=true&timeZone=America%2FSao_Paulo&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2019-09-01T00%3A00%3A00-03%3A00&timeMax=2019-09-30T00%3A00%3A00-03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs"
        // const { data } = await axios.get(eventsCalendar);
        // data.forEach( (event) => {
            
        // })
        
        const answer = "Em breve divulgaremos uma lista com próximos eventos e iniciativas do projeto, aguarde. Por hora você precisa de algo a mais?";
        return handlerInput.responseBuilder
            .speak(answer)
            .reprompt('ajuda')
            .getResponse();
    }
};
const LearningIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LearningIntent';
    },
    handle(handlerInput) {
        // const grasshopper = "https://play.google.com/store/apps/details?id=com.area120.grasshopper&hl=pt_BR"
        const speakOutput = 'Você quer aprender como? Por aplicativo, youtube ou tutorial escrito?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('ajuda')
            .getResponse();
    }
};

const LearningAppIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LearningAppIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Existe um app chamado Grasshopper que pode te ajudar. Ele é em formato de um jogo e você pode baixá-lo, na Google Play, também estou mandando o link por notificação. Algo mais?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard("Aplicativo Grasshopper", "Comece a aprender javascript com esse app https://play.google.com/store/apps/details?id=com.area120.grasshopper&hl=pt_BR")
            .reprompt('ajuda')
            .getResponse();
    }
};

const LearningVideosIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LearningVideosIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Vou compartilhar com você uma playlist de vídeos que ensina javascript básico, estou te mandando o link. Posso ajudar com algo a mais?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withSimpleCard("Playlist Curso de Javascript", "Comece a aprender javascript com essa playlist https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1")
            .reprompt('app')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Eu posso te ajudar respondendo sobre o que é o grupo JS Londrina, ou caso você queira aprender é só me falar quero aprender que te ajudo. O que você precisa?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Até mais, te espero no próximo evento do grupo!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Você acionou ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Desculpe não consegui entender. Pode tentar novamente?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DescriptionIntentHandler,
        EventsIntentHandler,
        LearningIntentHandler,
        LearningAppIntentHandler,
        LearningVideosIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
