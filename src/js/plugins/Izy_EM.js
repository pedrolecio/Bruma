//============================================================================
// Izy_EM.js
//----------------------------------------------------------------------------
// Save, restore, delete all your items, weapons, armors in party's inventory.
//============================================================================

var Imported = Imported || {};
Imported.Izy_EM = true;
Imported.Izy_EM_name = "Izy's Equipment Manager";
Imported.Izy_EM_isBeta = true;
Imported.Izy_EM_desc = "Save, restore, delete all your items, weapons, armors in party's inventory.";
Imported.Izy_EM_version = '1.00';
Imported.Izy_EM_author = 'Izyees Fariz';

var Izy_EM = Izy_EM || {};

/*:
 * @plugindesc Save, restore, delete all your items, weapons, armors in party's inventory.
 * Izys library scripts.
 * @author Izyees Fariz
 *
 * @param
 * @desc
 * @default
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * This script will let you control your equipments such as items, weapons and
 * armors.
 * Free for commercial and non-Commercial games.
 * Credit me as Izyees Fariz.
 * Beta version, will improved at final version. Please keep this plugin update.
 * Take note that some function will not work properly until the final version
 * release.
 *
 * ============================================================================
 * Compatibility Notes
 * ============================================================================
 * Work with all yanfly's plugin. Put it below all yanfly's plugins.
 * Work with all of my other plugins, put this below all others.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * Plugin Command (incasesensitive):
 * ------------------------------------------------------------------
 *   TYPE:
 *   i = inventory
 *   e = equipment
 *   
 *   ITEM TYPE:
 *   item
 *   weapon
 *   armor
 *   all
 *   
 *   SLOT
 *   slot is the number of unlimited. Slot can be any number. Default is 0
 *
 *   change x with 'type'
 *   change a with 'item type'
 *   change b to any 'slot' number (unnecessary)
 *   change c with actor id.
 *   start your plugin command with em_
 *
 * ------------------------------------------------------------------
 *   x_save a b
 *
 *   - em_i_save all (will save all items, weapons, armors in inventory
 *     to slot 0)
 *
 * ------------------------------------------------------------------
 *   x_load a b
 *
 *   - em_i_load all (will load all items, weapons, armors in slot 0)
 *   - em_i_load item 3 (will load all items in slot 3)
 *
 * ------------------------------------------------------------------
 *   x_restore a
 *
 *   - don't need slot. Will automatically restore slot 0.
 *   - em_i_restore all (will restore all items, weapons, armors in slot
 *     0)
 *
 * ------------------------------------------------------------------
 *   i_empty a
 *   e_empty c
 *
 *   - don't need slot.
 *   - em_i_empty all (will remove all items, weapons, armors from inventory)
 *   - em_e_empty all (will clear all actor equipments, will not remove it from
 *     inventory)
 *   - em_e_empty 3 (will clear actor 3 equipments, will not remove it from
 *     inventory)
 *
 * ------------------------------------------------------------------
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * Version 1.00:
 * - Finished Plugin!
 */

//============================================================================
// Startin' Script.
//============================================================================

(function () {

	Array.prototype.insert = function (index, item) {
		this.splice(index, 0, item);
	};

	Izy_EM.initializeParty = Game_Party.prototype.initialize;
	Game_Party.prototype.initialize = function () {
		this._itemsSlot = [];
		this._weaponsSlot = [];
		this._armorsSlot = [];
		this._equipmentsSlot = [];
		this._equipmentsSlotItems = [];
		Izy_EM.initializeParty.call(this)
	};
	
	Game_Party.prototype.setupEquipmentsSlot = function () {
		//for (i)
	};

	Game_Party.prototype.saveItems = function (slot) {
		if (slot) {
			this._itemsSlot[slot] = this._items;
		} else {
			this._itemsSlot[0] = this._items;
		}
	};

	Game_Party.prototype.saveWeapons = function (slot) {
		if (slot) {
			this._weaponsSlot[slot] = this._weapons;
		} else {
			this._weaponsSlot[0] = this._weapons;
		}
	};

	Game_Party.prototype.saveArmors = function (slot) {
		if (slot) {
			this._armorsSlot[slot] = this._armors;
		} else {
			this._armorsSlot[0] = this._armors;
		}
	};

	Game_Party.prototype.saveEquipments = function (slot, actorID) {
		if (slot) {
			this._equipmentsSlot[slot] = this._equipmentsSlot[slot] || [];
			for (i = 0; i < this._actors.length; i++) {
				if (this._actors[i] == actorID) {
					this._equipmentsSlot[slot].insert(actorID, $gameActors.actor(actorID).equips());
				}
			}
		} else {
			this._equipmentsSlot[0] = this._equipmentsSlot[0] || [];
			for (i = 0; i < this._actors.length; i++) {
				if (this._actors[i] == actorID) {
				this._equipmentsSlot[0].insert(actorID, $gameActors.actor(actorID).equips());
				}
			}
			console.log(this._equipmentsSlot[0]);
		}
	};

	Game_Party.prototype.saveAllInventories = function (slot) {
		this.saveItems(slot);
		this.saveWeapons(slot);
		this.saveArmors(slot);
	};

	Game_Party.prototype.saveAllEquipments = function (slot) {
		for (i = 0; i < this._actors.length; i++) {
			this.saveEquipments(slot, this._actors[i]);
		}
	};

	Game_Party.prototype.loadItems = function (slot) {
		if (slot) {
			this._items = this._itemsSlot[slot] || {};
		} else {
			this._items = this._itemsSlot[0] || {};
		}
	};

	Game_Party.prototype.loadWeapons = function (slot) {
		if (slot) {
			this._weapons = this._weaponsSlot[slot] || {};
		} else {
			this._weapons = this._weaponsSlot[0] || {};
		}
	};

	Game_Party.prototype.loadArmors = function (slot) {
		if (slot) {
			this._armors = this._armorsSlot[slot] || {};
		} else {
			this._armors = this._armorsSlot[0] || {};
		}
	};

	Game_Party.prototype.loadEquipments = function (slot, actorID) {
		if (slot) {
			for (i = 0; i < this._actors.length; i++) {
				if (this._actors[i] == actorID) {
					$gameActors.actor(actorID).initEquips(this._equipmentsSlot[slot][actorID]);
				}
			}
		} else {
			for (i = 0; i < this._actors.length; i++) {
				if (this._actors[i] == actorID) {
					$gameActors.actor(actorID).initEquips(this._equipmentsSlot[0][actorID]);
				}
			}
		}
	};

	Game_Party.prototype.loadAllInventories = function (slot) {
		this.loadItems(slot);
		this.loadWeapons(slot);
		this.loadArmors(slot);
	};

	Game_Party.prototype.loadAllEquipments = function (slot) {
		for (i = 0; i < this._actors.length; i++) {
			this.loadEquipments(slot, this._actors[i]);
		}
	};

	Game_Party.prototype.emptyItems = function () {
		this._items = {};
	};

	Game_Party.prototype.emptyWeapons = function () {
		this._weapons = {};
	};

	Game_Party.prototype.emptyArmors = function () {
		this._armors = {};
	};

	Game_Party.prototype.emptyAllInventories = function () {
		this.emptyItems();
		this.emptyWeapons();
		this.emptyArmors();
	};

	Game_Party.prototype.emptyAllEquipments = function () {
		for (i = 0; i < this._actors.length; i++) {
			$gameActors.actor(this._actors[i]).clearEquipments();
		}
	};

	//============================================================================
	// Plugin Commands
	//============================================================================

	Izy_EM.PLGC = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function (command, args) {
		Izy_BCE.PLGC.call(this, command, args)
		if (command.toLowerCase() == 'em_i_save') {
			if (args[0].toLowerCase() == 'item') {
				$gameParty.saveItems(args[1]);
			} else if (args[0].toLowerCase() == 'weapon') {
				$gameParty.saveWeapons(args[1]);
			} else if (args[0].toLowerCase() == 'armor') {
				$gameParty.saveArmors(args[1]);
			} else if (args[0].toLowerCase() == 'all') {
				$gameParty.saveAllInventories(args[1]);
			}
		}

		if (command.toLowerCase() == 'em_i_load') {
			if (args[0].toLowerCase() == 'item') {
				$gameParty.loadItems(args[1]);
			} else if (args[0].toLowerCase() == 'weapon') {
				$gameParty.loadWeapons(args[1]);
			} else if (args[0].toLowerCase() == 'armor') {
				$gameParty.loadArmors(args[1]);
			} else if (args[0].toLowerCase() == 'all') {
				$gameParty.loadAllInventories(args[1]);
			}
		}

		if (command.toLowerCase() == 'em_i_restore') {
			if (args[0].toLowerCase() == 'item') {
				$gameParty.loadItems(0);
			} else if (args[0].toLowerCase() == 'weapon') {
				$gameParty.loadWeapons(0);
			} else if (args[0].toLowerCase() == 'armor') {
				$gameParty.loadArmors(0);
			} else if (args[0].toLowerCase() == 'all') {
				$gameParty.loadAllInventories(0);
			}
		}

		if (command.toLowerCase() == 'em_i_empty') {
			if (args[0].toLowerCase() == 'item') {
				$gameParty.emptyItems();
			} else if (args[0].toLowerCase() == 'weapon') {
				$gameParty.emptyWeapons();
			} else if (args[0].toLowerCase() == 'armor') {
				$gameParty.emptyArmors();
			} else if (args[0].toLowerCase() == 'all') {
				$gameParty.emptyAllInventories();
			}
		}

		if (command.toLowerCase() == 'em_e_save') {
			if (args[0].toLowerCase() == 'all') {
				$gameParty.saveAllEquipments(args[1]);
			} else {
				$gameParty.saveEquipments(args[1], args[0]);
			}
		}

		if (command.toLowerCase() == 'em_e_load') {
			if (args[0].toLowerCase() == 'all') {
				$gameParty.loadAllEquipments(args[1]);
			} else {
				$gameParty.loadEquipments(args[1], args[0]);
			}
		}

		if (command.toLowerCase() == 'em_e_restore') {
			if (args[0].toLowerCase() == 'all') {
				$gameParty.loadAllEquipments(0);
			} else {
				$gameParty.loadEquipments(0, args[0]);
			}
		}

		if (command.toLowerCase() == 'em_e_empty') {
			if (args[0].toLowerCase() == 'all') {
				$gameParty.emptyAllEquipments();
			} else {
				$gameActors.actor(args[0]).clearEquipments();
			}
		}
	};

})();

//============================================================================
// End Script.
//============================================================================
