export class Tweetos {
     _id: string;  
     email: string;  
     username: string;   
     avatar: string;  
     followers: string[];

    constructor( _id: string,  email: string,  username: string,   avatar: string,  followers: string[]){
        try {
            this._id = _id;
            this.email = this.emailGuard(email);
            this.username = username;
            this.avatar = avatar;
            this.followers = followers;
        } catch (error) {
            throw error;
        }
    }

    private emailGuard(email: string): string {
        return email;
    }
}