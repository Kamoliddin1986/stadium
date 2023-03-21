import { Context } from 'telegraf';
import { CanActivate, Injectable, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';


@Injectable()
export class isOwnerGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService,
        private readonly usersService: UsersService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean>{
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if(!authHeader){
            throw new UnauthorizedException({
                message: 'token yuq'
            })
        }

        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        if(bearer !== 'Bearer' || !token){
            throw new UnauthorizedException({
                message: "Tokenda hatolik"
            });
        }

    
        let user: any;
        try {
            user = this.jwtService.verifyAsync(token, {secret:process.env.ACCESS_TOKEN_KEY})
        } catch (error) {
            throw new UnauthorizedException({
                message: "Token xato"
            })
        } 

        
        console.log(user);
        if(user.is_owner){
        throw new ForbiddenException({
        message: "stadion egasi emassiz"
        })
        }
        
        if(user.is_activa){
        throw new ForbiddenException({
        message: "siz activ foydalanuvchi emassiz"
        })
        }
        
        return true
    } 
}