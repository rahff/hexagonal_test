import { NextFunction, Request, Response } from "express";
import { JwtCheckerModule } from "../../core/app/modules/jwtChecker.module";

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const feature = JwtCheckerModule.get();
        const token = req.headers.authorization?.split('Bearer ')[1];
        if(!token) return res.status(401).json({message: "Unauthorized"});
        const isValidToken = await feature.isValidToken(token);
        if(!isValidToken) return res.status(401).json({message: "Unauthorized"});
        next()
    } catch (error) {
        res.status(401).json({message: "Unauthorized"});
    }
}

