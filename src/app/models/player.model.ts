
export class Player  {
  private static instance: Player;
  private audio: HTMLAudioElement | null = null;
  private player: HTMLDivElement | null = null;

  private constructor( ){}

  public static getInstance(audioUrl: string, elementId?: string ) {
    if(!this.instance){
      this.instance = new Player()
    }
    this.instance.createAudioObjet(audioUrl);
    if(elementId){
      this.instance.createAudioElement(elementId);
    }
      return this.instance
  }

  private createAudioObjet(audioUrl: string){
    this.audio = new Audio(audioUrl)
    this.audio.autoplay = true;
    this.audio.controls = true;
  }

  private createAudioElement(elementId: string){
    this.player = document.getElementById(elementId) as HTMLDivElement;
    this.player.innerHTML = '';
    this.player.appendChild(this.audio!);
  }

  public start():Promise<void> {
    return this.audio!.play()
  }

  public playPause(){
    if( this.audio!.paused ){
      this.audio?.play()
    }else{
      this.audio!.pause()
    }
  }

}














