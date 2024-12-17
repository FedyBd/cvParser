import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                let token = null;
                if (request && request.cookies) {
                    token = request.cookies['jwt'];
                }
                return token;
            }]),
            ignoreExpiration: false,
            secretOrKey: 'osifnqjom@{#@~shejrphqzfezr',
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
