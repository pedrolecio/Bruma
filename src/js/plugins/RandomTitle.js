Scene_Title.prototype.playTitleMusic = function() {
    //AudioManager.playBgm($dataSystem.titleBgm);
    AudioManager.playBgm({
       name: (function(){
           var music = [
                   "HOME - Resonance",
                   "Castle1",
                   "Dungeon1",
                   "Field1",
                   "Ship1",
                   "Theme1",
                   "Town1"
               ];
           return music[
               Math.floor(Math.random()*music.length)
           ];  
       })(),
       pan: 0,
       pitch: 100,
       volume: 100
    });
    AudioManager.stopBgs();
    AudioManager.stopMe();
};