//=============================================================================
// Yanfly Engine Plugins - Event Chase Player
// YEP_EventChasePlayer.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventChasePlayer = true;

var Yanfly = Yanfly || {};
Yanfly.ECP = Yanfly.ECP || {};

//=============================================================================
 /*:
 * @plugindesc v1.03 Quando um jogador está na proximidade de um certo
 * evento, o evento começará a seguir ou fugir do jogador.
 * @author Yanfly Engine Plugins
 *
 * @param Sight Lock
 * @desc Esse é o número de frames por quanto tempo um evento segue o jogador
 * se 'this._seePlayer = true' for usado.
 * @default 300
 *
 * @param See Player
 * @desc O evento tem que ser capaz de ver o jogador por padrão?
 * NÃO - false     SIM - true
 * @default true
 *
 * @param Alert Timer
 * @desc Esse é o número de frames que deve ocorrer antes do balão de alerta
 * aparecer no mesmo evento.
 * @default 120
 *
 * @param Alert Balloon
 * @desc Esse é o balão padrão usado quando o jogador é visto.
 * Refere-se ao ID do balão.
 * @default 1
 *
 * @param Alert Sound
 * @desc Esse é o som padrão tocado quando o jogador é visto.
 * @default Attack1
 *
 * @param Alert Common Event
 * @desc O evento comum padrão tocado quando o jogador é visto.
 * Use 0 se você não quiser usar um Evento Comum.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * Esse plugin permite a você fazer eventos que irão seguir o jogador ou
 * fugir do jogador quando o jogador entrar dentro do alcance do evento ou
 * quando o evento ver o jogador.
 *
 * ============================================================================
 * Como Usar
 * ============================================================================
 *
 * Insira essas linhas na janela de chamada de script dentro do evento de
 * Rota de Movimento para dar a um evento o comando de seguir ou fugir.
 *
 * Nota: Isso não funciona com jogadores.
 *
 * Linhas de Chamada de Script
 *   this._chaseRange = x       Evento irá seguir o jogador se atingir x de
 *                              alcance.
 *   this._fleeRange = x        Evento irá fugir do jogador se atingir x de
 *                              alcance.
 *   this._chaseSpeed = x       Velocidade de movimento do evento quando
 *                              seguindo.
 *   this._fleeSpeed = x        Velocidade de movimento do evento quando
 *                              fugindo.
 *   this._sightLock = x        Evento irá fugir/seguir o jogador por x frames.
 *   this._seePlayer = true     Requer o evento de ser capaz de ver o jogador.
 *   this._seePlayer = false    Não requer o evento de ser capaz de ver o
 *                              jogador.
 *   this._alertBalloon = x     Esse balão vai acontecer quando o jogador é
 *                              visto.
 *   this._alertSound = x       Esse som vai acontecer quando o jogador é
 *                              visto.
 *   this._alertCommonEvent = x Esse evento vai acontecer quando o jogador é
 *                              visto.
 *
 * É melhor executar isso dentro de uma rota de movimento personalizada para
 * o evento a uma taxa de alta frequência. Tenha em mente que esse efeitos
 * somente ocorrem depois que a configuração é feita e executada, que quer
 * dizer que depois de carregar um mapa, se o evento com uma baixa frequência
 * não carregou 'this._chaseRange = x' na sua fila de movimento ainda, o
 * evento não irá seguir o jogador ainda.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Improved pathfinding for chasing events. They will get stuck less by walls
 * and/or events that may be blocking the event.
 * - Added random factor for fleeing events. Fleeing events won't simply just
 * run away 180 degrees away from the player. They will sometimes move in a
 * random direction.
 *
 * Version 1.02:
 * - Added 'Return After' parameter where events will return to their original
 * spot after chasing/fleeing from a player.
 * - Added 'Return Wait' parameter to determine how long an event will wait in
 * place before returning after a finished chase/flee.
 * - Added 'this._returnAfter' and 'this._returnWait' to the list of available
 * movement route script calls.
 *
 * Version 1.01:
 * - Added 'this._alertSoundPitch' 'this._alertSoundVol' 'this._alertSoundPan'
 * to the settings you can alter to adjust the alert sound.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventChasePlayer');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ECPSightLock = Number(Yanfly.Parameters['Sight Lock']);
Yanfly.Param.ECPSeePlayer = String(Yanfly.Parameters['See Player']);
Yanfly.Param.ECPAlertTimer = Number(Yanfly.Parameters['Alert Timer']);
Yanfly.Param.ECPAlertBalloon = Number(Yanfly.Parameters['Alert Balloon']);
Yanfly.Param.ECPAlertSound = String(Yanfly.Parameters['Alert Sound']);
Yanfly.Param.ECPAlertEvent = Number(Yanfly.Parameters['Alert Common Event']);
Yanfly.Param.ECPReturn = eval(String(Yanfly.Parameters['Return After']));
Yanfly.Param.ECPReturnWait = Number(Yanfly.Parameters['Return Wait']);

//=============================================================================
// Main Code
//=============================================================================

Yanfly.ECP.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
    Yanfly.ECP.Game_Event_setupPage.call(this);
    this.clearChaseSettings();
};

Game_Event.prototype.clearChaseSettings = function() {
  this._alertBalloon = Yanfly.Param.ECPAlertBalloon;
  this._alertCommonEvent = Yanfly.Param.ECPAlertEvent;
  this._alertLock = 0;
  this._alertPlayer = false;
  this._alertSound = Yanfly.Param.ECPAlertSound;
  this._alertSoundVol = 100;
  this._alertSoundPitch = 100;
  this._alertSoundPan = 0;
  this._alertTimer = 0;
  this._chasePlayer = false;
  this._chaseRange = 0;
  this._chaseSpeed = this._moveSpeed;
  this._defaultSpeed = this._moveSpeed;
  this._fleePlayer = false;
  this._fleeRange = 0;
  this._fleeSpeed = this._moveSpeed;
  this._seePlayer = eval(Yanfly.Param.ECPSeePlayer);
  this._sightLock = eval(Yanfly.Param.ECPSightLock);
  this._returnAfter = Yanfly.Param.ECPReturn;
  this._returnWait = Yanfly.Param.ECPReturnWait;
  this._returnPhase = false;
  this._returnFrames = 0;
  this._startLocationX = this.x;
  this._startLocationY = this.y;
  this._startLocationDir = this._direction;
};

Yanfly.ECP.Game_Event_updateSelfMovement =
    Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (Imported.YEP_StopAllMove && $gameSystem.isEventMoveStopped()) return;
    this.updateChaseDistance();
    this.updateFleeDistance();
    this.updateChaseMovement();
};

Yanfly.ECP.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    Yanfly.ECP.Game_Event_update.call(this);
    this.updateAlert();
    this.updateReturnPhase();
};

Game_Event.prototype.canSeePlayer = function() {
    if (!this._seePlayer) return false;
    var sx = this.deltaXFrom($gamePlayer.x);
    var sy = this.deltaYFrom($gamePlayer.y);
    if (Math.abs(sx) > Math.abs(sy)) {
      var direction = (sx > 0) ? 4 : 6;
    } else {
      var direction = (sy > 0) ? 8 : 2;
    }
    if (direction === this.direction()) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.updateChaseDistance = function() {
    if (this._erased) return;
    if (this._chaseRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.chaseConditions(dis)) {
      this.startEventChase();
    } else if (this._chasePlayer) {
      this.endEventChase();
    }
};

Game_Event.prototype.chaseConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._chaseRange && this.canSeePlayer()) return true;
    if (dis <= this._chaseRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventChase = function() {
    this._chasePlayer = true;
    this.setMoveSpeed(this._chaseSpeed);
};

Game_Event.prototype.endEventChase = function() {
    this._chasePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateFleeDistance = function() {
    if (this._erased) return;
    if (this._fleeRange <= 0) return;
    var dis = Math.abs(this.deltaXFrom($gamePlayer.x));
    dis += Math.abs(this.deltaYFrom($gamePlayer.y));
    if (this.fleeConditions(dis)) {
      this.startEventFlee();
    } else if (this._fleePlayer) {
      this.endEventFlee();
    }
};

Game_Event.prototype.fleeConditions = function(dis) {
    if (this._alertLock > 0) return true;
    if (dis <= this._fleeRange && this.canSeePlayer()) return true;
    if (dis <= this._fleeRange && !this._seePlayer) {
      this._alertLock = this._sightLock;
      return true;
    }
    return false;
};

Game_Event.prototype.startEventFlee = function() {
    this._fleePlayer = true;
    this.setMoveSpeed(this._fleeSpeed);
};

Game_Event.prototype.endEventFlee = function() {
    this._fleePlayer = false;
    this.setMoveSpeed(this._defaultSpeed);
    if (this._alertTimer <= 0) this._alertPlayer = false;
    this.startReturnPhase();
};

Game_Event.prototype.updateChaseMovement = function() {
    if (this._stopCount > 0 && this._chasePlayer) {
      var direction = this.findDirectionTo($gamePlayer.x, $gamePlayer.y);
      if (direction > 0) this.moveStraight(direction);
    } else if (this._stopCount > 0 && this._fleePlayer) {
      this.updateFleeMovement();
    } else if (this._returnPhase) {
      this.updateMoveReturnAfter();
    } else {
      Yanfly.ECP.Game_Event_updateSelfMovement.call(this);
    }
};

Game_Event.prototype.updateFleeMovement = function() {
    switch (Math.randomInt(6)) {
    case 0: case 1: case 2: case 3: case 4:
      this.moveAwayFromPlayer();
      break;
    case 5:
      this.moveRandom();
      break;
    }
};

Game_Event.prototype.updateAlert = function() {
    if (this._erased) return;
    this._alertLock--;
    if (this.alertConditions()) this.activateAlert();
    if (this._alertPlayer) this._alertTimer--;
};

Game_Event.prototype.alertConditions = function() {
    return (this._chasePlayer || this._fleePlayer) && !this._alertPlayer;
};

Game_Event.prototype.activateAlert = function() {
    if (this._alertBalloon >= 0) this.requestBalloon(this._alertBalloon);
    this._alertPlayer = true;
    this._alertTimer = Yanfly.Param.ECPAlertTimer;
    this.playAlertSound();
    this.playAlertCommonEvent();
};

Game_Event.prototype.playAlertSound = function() {
    if (this._alertSound === '') return;
    var sound = {
      name:   this._alertSound,
      volume: this._alertSoundVol,
      pitch:  this._alertSoundPitch,
      pan:    this._alertSoundPan
    };
    AudioManager.playSe(sound);
};

Game_Event.prototype.playAlertCommonEvent = function() {
    if (this._alertCommonEvent <= 0) return;
    $gameTemp.reserveCommonEvent(this._alertCommonEvent);
};

Game_Event.prototype.startReturnPhase = function() {
    if (!this._returnAfter) return;
    this._returnPhase = true;
    this._returnFrames = this._returnWait;
};

Game_Event.prototype.updateReturnPhase = function() {
    if (this._returnPhase) this._returnFrames--;
};

Game_Event.prototype.updateMoveReturnAfter = function() {
    if (this._returnFrames > 0) return;
    var sx = this.deltaXFrom(this._startLocationX);
    var sy = this.deltaYFrom(this._startLocationY);
    if (Math.abs(sx) > Math.abs(sy)) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
          this.moveStraight(sy > 0 ? 8 : 2);
        }
      } else {
        this.moveRandom();
      }
    } else if (sy !== 0) {
      if (Math.randomInt(6) <= 4) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
          this.moveStraight(sx > 0 ? 4 : 6);
        }
      } else {
        this.moveRandom();
      }
    }
    if (sx === 0 && sy === 0) {
      this._returnPhase = false;
      this._returnFrames = 0;
      this._direction = this._startLocationDir;
    }
};

//=============================================================================
// End of File
//=============================================================================
