"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(helmet());
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'Authorization'],
        credentials: true,
        optionsSuccessStatus: 204
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map