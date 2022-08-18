export class Tweetos {
    
    constructor(private id: string, private email: string, private username: string,  private avatar: string, private followers: Tweetos[]){}

    public getEmail(){
        return this.email;
    }
    
    public getAvatar(){
        return this.avatar;
    } 
     
    public getFollowers(){
        return this.followers;
    } 
     
    public getUsername(){
        return this.username;
    }   
    
    public getId(){
        return this.id;
    }     
}