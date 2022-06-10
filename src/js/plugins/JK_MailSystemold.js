//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
// JK_MailSystem.js v2.2
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
/*:
* @plugindesc Allows the player to receive and read messages.
* @author Pirobi

* @param MailBoxLength
* @type number
* @min 1
* @desc The number of different mailboxes in the game
* Default: 1
* @default 1

* @param MailBoxNames
* @type text[]
* @desc The name to attach to each mailbox. MUST MATCH MailBoxLength!!!!!
* @default ["Default Mailbox"]

* @param UnreadText
* @desc The text to display in the Unread Messages window
* Default: Unread Mail:
* @default Unread Mail:

* @param NoMailText
* @desc The text that will display when the mailbox is empty
* Default: ~No new Mail~
* @default ~No new Mail~

* @param FromText
* @desc The text that appears in the "From" Field
* Default: From:
* @default From:

* @param SubjectText
* @desc The text that appears in the "Subject" Field
* Default: Subject:
* @default Subject:

* @param NoAttachmentText
* @desc The text that appears when the message has no attachment
* Default: ~No Attachments~
* @default ~No Attachments~

* @param AttachmentText
* @desc The text that appears when an unread message has an attachment
* Default: ~1 Attachment~
* @default ~1 Attachment~

* @param UnreadTextColor
* @type number
* @min 1
* @max 31
* @desc The color of unread mail in the mail list
* Valid Range: 1-31 (Color determined by windowskin)
* @default 31

* @param MailHeaderTextColor
* @type number
* @min 1
* @max 31
* @desc The color of the "From" and "Subject" text
* Valid Range: 1-31 (Color determined by windowskin)
* @default 1

* @param OverrideDeleteFlag
* @type select
* @option Don't Override
* @value 0
* @option NEVER ALLOW DELETE
* @value 1
* @option ALWAYS ALLOW DELETE
* @value 2
* @desc Override the flag in the messages?
* @default 0

* @param DefaultScroll
* @type select
* @option Don't Override
* @value 0
* @option NEVER SCROLL
* @value 1
* @option ALWAYS SCROLL
* @value 2
* @desc Override each message scroll option?
* @default 0

* @help Throughout the game, the player can receive letters or messages
via a mailbox, computer, etc.
:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
Release Notes
:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
-2.2: Added ability to have multiple pages in one message. Added more Flag
options. Added ability to disable scrolling, allowing for word wrapping to be used.
-2.11: Fixed issue where empty mailbox would crash game.
-2.1: Added ability to delete mail from inside the mailbox scene. Added
Flags to indicate if a message can be deleted or not. Updated Mail Scene
Look and feel to incorporate deletion.
-2.02: Fixed Save/Load issues introduced in 2.0.1
-2.01: Added plugin parameters to adjust text colors of unread mail,
"From", and "Subject" texts. General performance improvements.
Added option to perform manual line breaks using <br> in the json.
-2.0: Added options to add, sub, mult, divide, and mod variables
via triggers. Made newest messages appear at the top of mailbox list.
-1.95: Small bugfixes. Modified Attachment Window to reveal the Attachment
name when the message is read.
-1.9: Static text in the Mail scene is now customizable. Added
getter functions to return Sender and Subjects for specified
messages, indicated by ID. Adjusted Attachments so that they can
only be collected when the message is read.
-1.8: Fixed issue Where MailAdd id box1 box2 box3 . . . was doing
the same as MailAddAll. Changed MailAddAll to be able to add
multiple messages to all mailboxes.
-1.75: Fixed issue where Mail Scene was lagging. Changed controls
so that left and right will enter/exit the mail window instead
of Q/W.
-1.7: Added ability to call a trigger after a message is read.
These triggers range from setting a switch or variable, to calling
a common event or script. Fixed issue where loading a saved game
would double the messages in the mailbox.
-1.6: Fixed bug where mailbox doesn't open when there is no mail.
Updated code to center the mail scene on bigger resolution.
-1.5: Added ability to scroll through messages in order to see long
ones properly. Added auto-word-wrapping functionality to editor.
-1.4: Added plugin commands to add multiple messages to a mailbox, and
to add a message to multiple mailboxes. Created mail editor tool.
-1.3: Added ability to have multiple mailboxes, so that each individual
mailbox can receive different messages (Useful for multiple
characters, bulletin boards, etc.)
-1.2: Removed a line in the mail attachment window. This line crashed
the game in some instances, but worked fine in others...however,
it seems to work when the line is removed.
-1.1: Forgot to add ability to save the mail list(fixed). Added ability
to add attachments to messages.
-1.0: Initial release
:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
Plugin Commands:
:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

MailAdd id
Adds the specified message to the first mailbox.

MailAdd id box1 box2 box3 . . .
Adds the specified message to the specified box(es).

MailAddAll id1 id2 id3 . . .
Adds the specified message(s) to every mailbox.

MailBoxAdd box id1 id2 id3 . . .
Adds the specified message(s) to the specified mailbox.

MailRemove id box
Removes the specified message from the specified box.
If box is not defined, the first mailbox will be the default.

MailRead id box
Changes the status of the specified message in the specified
box to read.
Must be in the mailbox first for this to work!
If box is not specified, then the first box will be the default.

MailUnread id box
Changes the status of the specified message in the specified box
to unread.
Must be in the mailbox first for this to work!
If box is not specified, then the first box will be the default.

MailBoxOpen id
Opens up the mailbox scene using the specified mailbox.
Mail Box ID starts from zero!
It would be a good idea to keep track of which id belongs to
which mailbox!

:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
Instructions For Use:
:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
A file called Mail.json must be placed in your project's data folder.
Inside this folder, format the JSON as follows:
[
{//This is 1 single message
"id":1,"sender":"Dad","subject":"Test","attachment":"0",
"message":"Hello!","trigger":"0","flag":"n","allowScroll":"false"
},
{
"id":2,"sender":"Mom","subject":"Test2","attachment":"g100",
"message":"Hi! Here's some money to help you out!",
"trigger":"c,1"
},
{
"id":3,"sender":"Pirobi","subject":"Updates!","attachment":"i1",
"message":"Here's a potion for your trouble!",
"trigger":"0"
}
//etc. for each message in your game.
]

~ Multiple Pages ~
As of version 2.2, you can split your message into multiple pages! 
This allows for longer messages without having to scroll through each line!
To indicate a page break, place a <pg> in your message. To move from page to page,
press left and right while the cursor is in the message window. 
NOTE: A message will not be considered read until ALL pages have been seen! This also
means that triggers will not execute until a message is fully read.

~ Scrolling ~ 
As of version 2.2, you can now choose whether each message will support scrolling or not.
The default value is enabled. Essentially, this option will change whether your message will
be all in one string or be split up for each line.

If Scrolling is enabled:
	- Word wrapping is not supported, so you will have to manually escape each line of text
		so it fits within the window
		
If Scrolling is disabled:
	- Word wrapping will be supported. If you do NOT use word wrapping, you will still need to
		manually escape your text so it will fit in the window.
	- The cursor will still appear and may still have multiple lines you can scroll.
		This is NORMAL.


~ Using Flags ~
Introduced in version 2.1, you can now flag a message so that the player cannot delete it from the mailbox.
The following line must be placed inside each mail json object:

"flag":"w, x, y, z"

Where w is the type of flag you want to set:
s - allow this message to be deleted only after a switch with an ID of x is set to ON.
v - allow this message to be deleted only after a variable with an ID of x passes the given condition
	In this case, y can be set to the following:
	0 - pass if the variable at x is equal to z
	1 - if the variable at x is greater than z
	2 - if the variable at x is greater than or equal than z
	3 - if the variable at x is less than z
	4 - if the variable at x is less than or equal to z
	5 - if the variable at x is not equal to z

	y and z are only looked at in this case.
n - never allow the message to be deleted
j - allow this message to be deleted if and only if the script at x evaluates to true

Put any other value to allow the message to be deleted. If this field is not included, it will default to always delete.
These work similar to triggers in terms of the functions of w, x, y, and z.

RULES FOR FLAGS:
- Only a message that has no attachment can be deleted - meaning you must collect any attachments before you can delete it.
- PLUGIN COMMANDS WILL STILL REMOVE THE MESSAGE, EVEN IF IT IS SET TO LOCKED. The reason for this is because plugin commands are
at the discretion of the developer, which should override the player's extent of control.
- Triggers will still execute even if a READ message is deleted. If an UNREAD message is deleted, the trigger will NOT execute. 
One way to guarantee your trigger will run is to use a common event trigger that does your processing, then sets a switch at the end. 
Then, give the message a switch flag using that switch. That way, the message can't be deleted until the trigger runs!
- Because triggers don't activate until you leave the mail scene, if a message's flag is set to a switch that gets set in a trigger, 
you need to exit the mail scene before you're allowed to delete the message.

EXAMPLES OF FLAGS:
"flag": "s,10" - this message can only be deleted if switch 10 is ON
"flag": "j, $gameSwitches.value(10)" - the same as above but using a script call
"flag": "j, $gameParty._actors[0] === 1" - this message can only be deleted while actor 1 is the leader of the party.
"flag": "j, $gameParty._actors[0] === 1 && $gameSwitches.value(10) && $gameActors.actor(1)._level === 5" 
	- this message can only be deleted while actor 1 is the leader of the party, switch 10 is on, and actor 1 is level 5
"flag": "v, 10, 1, 30" - this message can only be deleted while variable 10 is greater than 30
"flag": "0" - this message can always be deleted from the mailbox scene

~ Using Triggers ~
Introduced in version 1.7, you can now perform triggers when a message
is read. The following line must be placed inside each mail json object:

"trigger":"w, x, y, z"

Where w is the type of trigger you want to perform:
s to set a switch. If the switch is off, it will turn on, and vice versa.
v to set a variable.
c to run a common event.
j to run a script call.
Put any other value to have no trigger.

For switches, variables, or common events, x will be the index
For a script call, x will be the script itself.

When w is set to variable(e.g. "trigger":"v,1,11,0"), y will be the value and z will be the operation.
In this example, x was set to 1, y is 11, and z is 0.

z can be set to one of the following values:
0 - Set the value of y to the variable at index x
1 - Add the value of y to the variable
2 - Subtract the value by y
3 - Multiply the value by y
4 - Divide the current value of the variable by y
5 - Mod the current value of the variable by y

If z has any other value, or z is omitted from the trigger (e.g. "trigger":"v,1,11"), it will default to setting the value.

EXAMPLE:
"trigger":"j,$gameVariables.setValue(1,4);" - Will run a script call to set the variable at index 1 to 4
"trigger":"v,1,4" - The same as above except using the direct notation
"trigger":"v,1,11,4" - Will divide the value of the variable at index 1 by 11 and store the answer in the same variable
"trigger":"v,3,$gameVariables.value(2),1" - Adds the value at variable index 2 to the value at index 3
"trigger":"c,30" - Will run common event at index 30

NOTE: If you add the same mail more than once, or are in a situation where
the same message will be in the "unread" state more than once, the trigger
WILL run again! This might be addressed in a future update if needed.

In addition, triggers will NOT activate until you exit the mail scene!

~ Using Attachments ~
As of version 1.1, you can choose to add 1 attachment to your message.
The following line must be placed inside each mail json object:

"attachment":"xy"

Where x is the type of item you want to attach:
a for armor,
w for weapon,
i for item,
g for gold.
Put any other value to have no attachment.

And y will have a different function depending on x:
For attaching gold, y will be the amount of gold to attach.
For attaching anything else, y is the database id of that
attachment.

i.e. a1 will attach the Armor at index 1 in the database.
g100 will attach 100 gold to the message.

To make it easier, simply put "attachment":"0" to specify
no attachment.

~ Script Calls ~
To call the Mailbox scene, use the following script call:
SceneManager.push(Scene_Mail);
Note, this call will now open the last used mailbox!
You can also use this call if only 1 mailbox is being used.

To check if a message is in the first(default) mailbox, use the following:
JKMail.isMailRead(mailID);

To check if a message in a specific box has been read, use the following
script call:
JKMail.isMailReadInBox(box, mailID);

To check if a message is in the first(default) mailbox, use the following:
JKMail.hasMail(mailID);
RETURNS THE INDEX OF THE MAIL IF FOUND, OR -1 IF NOT FOUND

To check if a message is in a specific mailbox, use the following:
JKMail.hasMailInBox(box, mailID);
RETURNS THE INDEX OF THE MAIL IF FOUND, OR -1 IF NOT FOUND

To check if a box has unread mail, use the following:
JKMail.hasUnreadMail(box);

To get the Sender of a specified message, use the following:
JKMail.getSender(mailID);

To get the Subject of a specified message, use the following:
JKMail.getSubject(mailID);

Where box is the id of the mailbox, and mailID is the id of the message.

~ Mail Scene Controls ~

When in the mailbox scene, the controls are as follows (using defaults):

Up/Down - navigate through the list of messages, or through the message.

Left/Right - Switch between the mail list window and the message window.

Space/Enter - Take the attachment from the message(if any).

X - exit the message/mail scene

:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
Copyright Information
:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
Copyright 2016, JK Software

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var Imported = Imported || {};
var JKMail = JKMail || {};

var $dataMail = null;

// Add to the database entries
DataManager._databaseFiles.push(
  {name: '$dataMail', src: 'Mail.json'}
);

//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//Window_MailList

//The window containing the mail currently stored in the mailbox.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

function Window_MailList(){
  this.initialize.apply(this, arguments);
}

Window_MailList.prototype = Object.create(Window_Selectable.prototype);
Window_MailList.prototype.constructor = Window_MailList;

Window_MailList.prototype.initialize = function(x, y, mailList){
  var width = this.windowWidth();
  var height = Graphics.boxHeight - y;
  Window_Selectable.prototype.initialize.call(this, x, y, width, height);
  this._mailList = mailList;
  this.refresh();
  this.select(0);
};

Window_MailList.prototype.windowWidth = function() {
  return 250;
};

Window_MailList.prototype.item = function(){
  return this._data[this.index()];
};

Window_MailList.prototype.maxItems = function(){
  return this._data ? this._data.length : 1;
};

Window_MailList.prototype.refresh = function(){
  this.makeItemList();
  this.createContents();
  this.drawAllItems();
  if(this._data.length === 0)
  {
    var rect = this.itemRect(0);
    rect.width -= this.textPadding();
    this.drawText(JKMail.Param.NoMailText, rect.x, rect.y, rect.width, 'center');
  }
};

Window_MailList.prototype.makeItemList = function(){
  this._data = this._mailList;
};

Window_MailList.prototype.drawItem = function(index){
  var rect = this.itemRect(index);
  rect.width -= this.textPadding();
  var mail = this._data[index];
  var color = (mail.isRead()) ? this.normalColor() : this.textColor(JKMail.Param.UnreadTextColor);
  this.changeTextColor(color);
  this.drawText(mail._subject, rect.x, rect.y, rect.width, 'left');
  this.changePaintOpacity(true);
  this.resetTextColor();
};

Window_MailList.prototype.setStatusWindow = function(statusWindow) {
  this._statusWindow = statusWindow;
};

Window_MailList.prototype.processOk = function() {
  SoundManager.playOk();
  this.callOkHandler();
};


//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//Window_Unread

//The window displaying how many messages are still unread
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
function Window_Unread(){
  this.initialize.apply(this, arguments);
}

Window_Unread.prototype = Object.create(Window_Base.prototype);
Window_Unread.prototype.constructor = Window_Unread;

Window_Unread.prototype.initialize = function(x, y){
  var width = this.windowWidth();
  Window_Base.prototype.initialize.call(this, x, y, width, this.fittingHeight(1));
  this.refresh();
};

Window_Unread.prototype.refresh = function(){
  this.contents.clear();
  var x = this.textPadding();
  this.drawInfo(x, 0);
};

Window_Unread.prototype.drawInfo = function(x, y){
  var width = this.contents.width - this.textPadding() - x;
  var displayText = JKMail.Param.UnreadText;
  var unreadNum = JKMail.activeMailBox.getNumberUnread();
  this.drawText(displayText, x - this.textWidth(unreadNum), y, width, "center");
  var color = (Number(unreadNum) === 0) ? this.normalColor() : this.textColor(JKMail.Param.UnreadTextColor);
  this.changeTextColor(color);
  this.drawText(unreadNum, x + this.textWidth(displayText)/2, y, width, "center");
  this.resetTextColor();
};

Window_Unread.prototype.windowWidth = function(){
  return 250;
};

//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//Window_Mail

//The window displaying the contents of a message.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
function Window_Mail(){
  this.initialize.apply(this, arguments);
}

Window_Mail.prototype = Object.create(Window_Selectable.prototype);
Window_Mail.prototype.constructor = Window_Mail;

Window_Mail.prototype.initialize = function(x, y){
  var height = Graphics.boxHeight - y - this.fittingHeight(2);
  this._width = Graphics.boxWidth - x;
  Window_Selectable.prototype.initialize.call(this, x, y, this._width, height);
  this._item = null;
  this._pageList = [];
  this._pageIndex = 0;
};

Window_Mail.prototype.refresh = function(){
  this.contents.clear();
  this.drawAllItems();
};

Window_Mail.prototype.setItem = function(item){
  this._item = item;
  this.makeItemList();
  this.refresh();
};

Window_Mail.prototype.maxPages = function(){
	return this._item._message.length;
};

Window_Mail.prototype.changePage = function(direction) {
	var newIndex = this._pageIndex + direction;
	this._pageIndex = ((newIndex % this.maxPages()) + this.maxPages()) % this.maxPages();
	this.makeItemList();
    this.refresh();
    SoundManager.playCursor();
};

Window_Mail.prototype.isPageChangeEnabled = function() {
    return this.visible && this.maxPages() >= 2;
};

Window_Mail.prototype.isPageChangeRequested = function() {
	var rv = 0;
    if (Input.isTriggered('left')){
		rv = -1;
	}
	else if(Input.isTriggered('right')) {
        rv = 1;
    }
    return rv;
};

Window_Mail.prototype.makeItemList = function(){
  this._data = [];
  var sender = "";
  var subject = "";
  if(this._pageIndex === 0){
	sender = "\\c[" + JKMail.Param.MailHeaderTextColor + "]" + JKMail.Param.FromText + "\\c[0] " + this._item._sender;
	subject = "\\c[" + JKMail.Param.MailHeaderTextColor + "]" + JKMail.Param.SubjectText + "\\c[0] " + this._item._subject;
  }
  if(this._item._allowScroll){
	  if(this._pageIndex === 0){
		  this._data.push(sender);
		  this._data.push(subject);
	  }
	  //Replace all instances where two lines are entered so we can manually do the line break later.
	  var msg = this._item._message[this._pageIndex].replace(/(\r\n){2}/g, "\r\n<br>");
	  var splitM = msg.split(/[\r\n]+/);
	  for(var x = 0; x < splitM.length; x++){
		var line = splitM[x];
		if(line.match(/<br>/)){
			//If there is a manual line break, split the line on it and add the parts before and after the <br> as separate lines
			var brLine = splitM[x].split("<br>");
			for(var y = 0; y < brLine.length; y++){
				this._data.push(brLine[y]);
			}
		}
		else if(splitM[x] === undefined){//If there is an undefined string for some reason, then just add an empty line
			this._data.push("");
			continue;
		}
		else{//Add the entire line normally
			this._data.push(line);
		}
	  }
  }
  else{
	  if(this._pageIndex === 0){
		  this._data.push(sender);
		  this._data.push(subject);
	  }
	  this._data.push(this._item._message[this._pageIndex]);
	  //TODO: Either hide cursor or change it since we won't be scrolling the page anyway.
		
  }
};

Window_Mail.prototype.maxItems = function(){
  return this._data ? this._data.length : 1;
};

Window_Mail.prototype.drawItem = function(index){
  if(this._data && this._data[index]){
    var rect = this.itemRect(index);
    this.drawTextEx(this._data[index], rect.x, rect.y, rect.width, "left");
    this.resetTextColor();
  }
};

Window_Mail.prototype.windowWidth = function() {
  return this._width;
};

Window_Mail.prototype.processOk = function() {
};

Window_Mail.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.updatePage();
};

Window_Mail.prototype.isPageChangeEnabled = function() {
    return this.visible && this.maxPages() >= 2;
};

Window_Mail.prototype.updatePage = function() {
	var direction = this.isPageChangeRequested();
    if (this.isPageChangeEnabled() && direction !== 0) {
        this.changePage(direction);
    }
};

//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//Window_MailAttachment

//The window containing the mail attachments.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
function Window_MailAttachment(){
  this.initialize.apply(this, arguments);
}
Window_MailAttachment.prototype = Object.create(Window_Selectable.prototype);
Window_MailAttachment.prototype.constructor = Window_MailAttachment;

Window_MailAttachment.prototype.initialize = function(x, y){
  this._width = Graphics.boxWidth - x;
  Window_Selectable.prototype.initialize.call(this, x, y, this._width, this.fittingHeight(2));
  this._item = null;
  this._pageIndex = 0;
  this.refresh();
};

Window_MailAttachment.prototype.setItem = function(item){
  this._item = item;
  this.refresh();
};

Window_MailAttachment.prototype.refresh = function(){
  this.contents.clear();
  this.createContents();
  if(this._item !== null){
    var rect = this.itemRect(0);
    rect.width -= this.textPadding();
    if(this._item._attachment === null)
    {
      this.drawText(JKMail.Param.NoAttachmentText, rect.x, rect.y, rect.width, 'center');
    }
    else if(!this._item.isRead()){
      this.drawText(JKMail.Param.AttachmentText, rect.x, rect.y, rect.width, 'center');
    }
    else
    {
      this.drawPossession(this.textPadding(), 0);
    }
  }
};

Window_MailAttachment.prototype.drawPossession = function(x, y){
  var width = this.contents.width - this.textPadding() - x;
  this.changeTextColor(this.pendingColor());
  var rect = this.itemRect(0);
  rect.width -= this.textPadding();
  if(typeof this._item._attachment === "number"){
    this.drawCurrencyValue(this._item._attachment, this.currencyUnit(), rect.x, rect.y, rect.width);
  }
  else{
    this.drawItem(0);
  }
  this.resetTextColor();
};

Window_MailAttachment.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
  var unitWidth = this.textWidth(unit);
  var goldWidth = this.textWidth(value);
  this.resetTextColor();
  this.drawText(value, x + 2, y, width - unitWidth - 6, 'left');
  this.changeTextColor(this.systemColor());
  this.drawText(unit, x + 2 + goldWidth, y, width - unitWidth, 'left');
};

Window_MailAttachment.prototype.currencyUnit = function() {
  return TextManager.currencyUnit;
};
Window_MailAttachment.prototype.drawItem = function(index) {
  var item = this._item._attachment;
  var rect = this.itemRect(index);
  rect.width -= this.textPadding();
  this.changeTextColor(this.pendingColor());
  this.drawItemName(item, rect.x, rect.y, rect.width);
};

Window_MailAttachment.prototype.claimAttachment = function(){
  if(this._item && this._item.hasAttachment()){
    SoundManager.playEquip();
    this._item.claimAttachment();
  }
};

Window_MailAttachment.prototype.windowWidth = function() {
  return this._width;
};

//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//Window_MailBoxCommand

//The first menu when entering the mailbox scene, with options to read
//and delete mail.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
function Window_MailBoxCommand(){
	this.initialize.apply(this, arguments);
}
	
Window_MailBoxCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_MailBoxCommand.prototype.constructor = Window_MailBoxCommand;

Window_MailBoxCommand.prototype.initialize = function(width){
	this._windowWidth = width;
	this._hasAttachment = false;
	this._canDelete = false;
    Window_HorzCommand.prototype.initialize.call(this, 0, 0);
};

Window_MailBoxCommand.prototype.windowWidth = function() {
    return this._windowWidth;
};

Window_MailBoxCommand.prototype.maxCols = function() {
    return 3;
};

Window_MailBoxCommand.prototype.makeCommandList = function() {
    this.addCommand("Ler",    'read');
	this.addCommand("Anexo", 'attachment', this._hasAttachment);
    this.addCommand("Deletar",   'delete', this._canDelete);
};

Window_MailBoxCommand.prototype.updateCommands = function(canDelete, hasAttachment){
	this._hasAttachment = hasAttachment;
	this._canDelete = canDelete;
	this.refresh();
};
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//Scene_Mail

//The scene class for looking at a mailbox.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

function Scene_Mail(){
  this.initialize.apply(this, arguments);
}

Scene_Mail.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Mail.prototype.constructor = Scene_Mail;

Scene_Mail.prototype.initialize = function(activebox) {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Mail.prototype.prepare = function(mailList){
  this._mailList = mailList;
  this._item = null;
};

Scene_Mail.prototype.create = function(){
  Scene_MenuBase.prototype.create.call(this);
  this.createHelpWindow();
  this._helpWindow.setItem(JKMail.activeMailBox);
  this.createUnreadWindow();
  this.createCommandWindow();
  this.createListWindow();
  this.createMailWindow();
  this.createAttachmentWindow();
  this._listWindow.activate();
};

Scene_Mail.prototype.createCommandWindow = function(){
	this._commandWindow = new Window_MailBoxCommand(Graphics.boxWidth - this._unreadWindow.windowWidth());
	this._commandWindow.y = this._helpWindow.height;
	this._commandWindow.x = this._unreadWindow.windowWidth();
	this._commandWindow.setHandler('read', this.onMailWindowEnter.bind(this));
	this._commandWindow.setHandler('attachment', this.onClaimAttachment.bind(this));
    this._commandWindow.setHandler('delete', this.onMailDelete.bind(this));
	this._commandWindow.setHandler('cancel', this.onCommandLeave.bind(this));
	this._commandWindow.deactivate();
	this._commandWindow.deselect();
	this.addWindow(this._commandWindow);
};

Scene_Mail.prototype.createMailWindow = function(){
  var wy = this._helpWindow.height + this._commandWindow.height;
  this._mailWindow = new Window_Mail(this._listWindow.windowWidth(), wy);
  this._mailWindow.setHandler('cancel', this.onMailWindowLeave.bind(this));
  this.addWindow(this._mailWindow);
};

Scene_Mail.prototype.createUnreadWindow = function(){
  var wy = this._helpWindow.height;
  this._unreadWindow = new Window_Unread(0, wy);
  this.addWindow(this._unreadWindow);
};

Scene_Mail.prototype.createAttachmentWindow = function(){
  var wy = this._mailWindow.y + this._mailWindow.height;
  this._attachmentWindow = new Window_MailAttachment(this._unreadWindow.windowWidth(), wy);
  this.addWindow(this._attachmentWindow);
};

Scene_Mail.prototype.createListWindow = function(){
  var wy = this._helpWindow.height + this._unreadWindow.height;
  this._oldIndex = 0;
  this._listWindow = new Window_MailList(0, wy, JKMail.activeMailBox._mailList);
  this._listWindow.setHandler('ok',     this.onCommandEnter.bind(this));
  this._listWindow.setHandler('cancel', this.popScene.bind(this));
  this.addWindow(this._listWindow);
};

Scene_Mail.prototype.update = function(){
  var index = this._listWindow.index();
  if(this.oldIndex != index){
    this.changeMailSelection(index);
    this.oldIndex = index;
    this.refreshAll();
  }
  if(this._mailWindow.isOpenAndActive() && !this._item.isRead()){
	  if(Input.isTriggered('left') || Input.isTriggered('right')){
		  this.onMailRead();
	  }
  }
  Scene_Base.prototype.update.call(this);
};

Scene_Mail.prototype.changeMailSelection = function(index){
    var mail = this._listWindow._data[index];
    if(mail){
      this._item = mail;
      this._mailWindow.setItem(mail);
      this._attachmentWindow.setItem(mail);
	  this._commandWindow.updateCommands(mail.canDelete(), mail.canClaimAttachment());
    }
};
Scene_Mail.prototype.refreshAll = function(){
	this._listWindow.refresh();
    this._mailWindow.refresh();
	this._commandWindow.refresh();
	this._attachmentWindow.refresh();
	this._unreadWindow.refresh();
};

Scene_Mail.prototype.onCommandLeave = function(){
	this._listWindow.activate();
	this._commandWindow.deselect();
	this._commandWindow.deactivate();
};

Scene_Mail.prototype.onCommandEnter = function(){
	if(this._item !== undefined){
		this._listWindow.deactivate();
		this._commandWindow.activate();
		this._commandWindow.select(0);
	}
};

Scene_Mail.prototype.onClaimAttachment = function(){
  this._attachmentWindow.claimAttachment();
  this._attachmentWindow.refresh();
  this._commandWindow.refresh();
  this._commandWindow.activate();
  this._commandWindow.updateCommands(this._item.canDelete(), this._item.canClaimAttachment());
};


Scene_Mail.prototype.onMailRead = function(){
    this._item.readPage();
    if(this._item.allPagesRead() && !this._item.isRead()){
		this._item.changeRead(true);
		this._listWindow.refresh();
		this._attachmentWindow.refresh();
		this._commandWindow.updateCommands(this._item.canDelete(), this._item.canClaimAttachment());
		this._unreadWindow.refresh();
		if(this._item._trigger !== undefined){
		  this.executeTrigger(this._item._trigger);
		}
    }
};

Scene_Mail.prototype.onMailWindowEnter = function(){
	this.onMailRead();
	this._mailWindow.activate();
	this._commandWindow.deactivate();
	this._mailWindow.select(0);
	SoundManager.playOk();
};

Scene_Mail.prototype.onMailDelete = function(){
		JKMail.activeMailBox.removeMail(this._item._id);
		var index = this._listWindow.index();
		if(index === (this._listWindow._data.length - 1)){
			this._listWindow.select(this._listWindow.index() - 1);
			this.update();
		}
		else{
			this.changeMailSelection(index);
			this.refreshAll();
		}
		this._listWindow.select(0);
		this.onCommandLeave();
};

Scene_Mail.prototype.onMailWindowLeave = function(){
  this._mailWindow.select(0);
  this._mailWindow.deselect();
  this._mailWindow.deactivate();
  this._commandWindow.activate();
  SoundManager.playCancel();
};

Scene_Mail.prototype.executeTrigger = function(trigger){
  var triggerList = trigger.split(",");
  var type = triggerList[0];
  switch(type){
    case "s"://switch
		var swtch = $gameSwitches.value(Number(triggerList[1]));
		$gameSwitches.setValue(Number(triggerList[1]), !swtch); //Toggles the switch, so if it's off turn it on, if on turn it off
    break;
    case "v"://variable
		if (triggerList.length < 3) break; //Improperly formatted
		var variableId = Number(triggerList[1]);
		var value = Number(triggerList[2]);
		if(triggerList.length === 3 && value !== undefined){//follows format of "v, y, z" where y is the index, and z is the value
			$gameVariables.setValue(variableId, value);
		}
		else if(triggerList.length === 4){
			var operationType = Number(triggerList[3]);
			if(value !== undefined && operationType !== undefined){//Keep compatibility with messages already using variable triggers
				//Follows format of v, x, y, z where x is index, y is the value, z is the operation
				try {
					var oldValue = $gameVariables.value(variableId);
					switch (operationType) {
						case 0:  // Set
							$gameVariables.setValue(variableId, oldValue = value);
							break;
						case 1:  // Add
							$gameVariables.setValue(variableId, oldValue + value);
							break;
						case 2:  // Sub
							$gameVariables.setValue(variableId, oldValue - value);
							break;
						case 3:  // Mul
							$gameVariables.setValue(variableId, oldValue * value);
							break;
						case 4:  // Div
							$gameVariables.setValue(variableId, oldValue / value);
							break;
						case 5:  // Mod
							$gameVariables.setValue(variableId, oldValue % value);
							break;
					}
				} catch (e) {
					$gameVariables.setValue(variableId, 0);
				}
			}
		}
    break;
    case "c"://common event
    $gameTemp.reserveCommonEvent(triggerList[1]);
    break;
    case "j"://script call
    var script = triggerList.slice(1).join(","); //Just in case we sliced extra commas by mistake
    eval(script);
    break;
    default: //No trigger
    break;
  }
};
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//JK_MailBox

//Represents a mailbox containing messages.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
function JK_MailBox(){
  this.initialize.apply(this, arguments);
}

JK_MailBox.prototype.initialize = function(){
  this._mailList = [];
};

JK_MailBox.prototype.addMail = function(mailID){
  var mail = new JK_Message(mailID);
  //this._mailList.push(mail);
  this._mailList.unshift(mail);
  console.warn(mail._sender + " " + mail._subject);
};

JK_MailBox.prototype.removeMail = function(mailID){
  var x = this.hasMail(mailID);
  if(x > -1){
    this._mailList.splice(x, 1);
  }
};

JK_MailBox.prototype.getMail = function(index){
  return this._mailList[index];
};

JK_MailBox.prototype.getNumberUnread = function(){
  var num = 0;
  this._mailList.forEach(function(entry){
    num += (entry.isRead()) ? 0 : 1;
  },this);
  return num;
};

JK_MailBox.prototype.isMailRead = function(mailID){
  var x = this.hasMail(mailID);
  return (x > -1) && this.getMail(x).isRead();
};

JK_MailBox.prototype.hasMail = function(mailID){
  for(var x = 0; x < this._mailList.length; x++){
    if(this._mailList[x]._id === mailID){
      return x;
    }
  }
  return -1;
};

JK_MailBox.prototype.changeRead = function(mailID, read){
  var x = this.hasMail(mailID)
  if(x > -1){
    this.getMail(x).changeRead(read);
  }
};

//When loading a game, create new message objects and inject
//The existing message data.
JK_MailBox.prototype.loadSavedMail = function(mailList){
  for(var i = 0; i < mailList.length; i++){
    var fromStorage = mailList[i];
    var message = new JK_Message(fromStorage._id);
	//The only values that really need to be pulled from the save file are if it was read and if it still has an attachment
	//Every other value is static and should never change
    message._pagesRead = fromStorage._pagesRead;
	message._read = fromStorage._read;
    message._hasAttachment = fromStorage._hasAttachment;
	//Can Delete should be extracted so we don't have to keep going through the logic to set it again.
	message._canDelete = fromStorage._canDelete;
    this._mailList.push(message);
  }
};

//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//JK_Message

//Represents a single message.
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
function JK_Message(){
  this.initialize.apply(this, arguments);
}

JK_Message.prototype.constructor = JK_Message;

JK_Message.prototype.initialize = function(id){
  this.setup(id);
};

JK_Message.prototype.determineAttachment = function(attachment){
  if(attachment === undefined) return null;
  var type = attachment.substring(0,1);
  var num = Number(attachment.substring(1));
  switch (type){
    case "i"://Item
    this._hasAttachment = true;
    return $dataItems[num];
    case "w"://Weapon
    this._hasAttachment = true;
    return $dataWeapons[num];
    case "a"://Armor
    this._hasAttachment = true;
    return $dataArmors[num];
    case "g"://Gold
    this._hasAttachment = true;
    return num;
    default: //No attachment
    this._hasAttachment = false;
    return null;
  }
};

JK_Message.prototype.setup = function(id){
  if(id !== undefined){
    var mail = $dataMail[id];
    this._id = id;
    this._sender = mail.sender || "";
    this._subject = mail.subject || "";
    this._message = mail.message.split('<pg>') || [""];
    this._attachment = this.determineAttachment(mail.attachment);
	this._read = false;
	this._pagesRead = 0;
    this._trigger = mail.trigger || ""; //Save the trigger for use later
	this._flag = mail.flag || "";
	this._canDelete = null;	
	this._allowScroll = this.determineScroll(eval(mail.allowScroll));
  }
};

JK_Message.prototype.determineScroll = function(allowScroll){
	switch(JKMail.Param.DefaultScroll){
		case 0:
			return (allowScroll !== undefined) ? allowScroll : true;
		case 1:
			return false;
		case 2:
			return true;
		default:
			return true;
	}
};

JK_Message.prototype.readPage = function(){
	this._pagesRead = Math.min(this._pagesRead + 1, this._message.length);
};

JK_Message.prototype.allPagesRead = function(){
	return this._pagesRead === this._message.length;
};

JK_Message.prototype.isRead = function(){
  return this._read;
};

JK_Message.prototype.changeRead = function(read){
  this._pagesRead = read ? this._message.length : 0;
  this._read = read;
};

JK_Message.prototype.hasAttachment = function(){
  return this._hasAttachment;
};

JK_Message.prototype.canDelete = function(){
	if(this._canDelete === null){
		//Construct the evaluation the first time since the code to evaluate should never change.
		if(JKMail.Param.OverrideDeleteFlag === 1) this._canDelete = "false";
		if(this._flag === null || JKMail.Param.OverrideDeleteFlag === 2) this._canDelete = "!this.hasAttachment";
		var flagList = this._flag.split(",");
		var type = flagList[0];
		if(type === null || flagList.length != 4) this._canDelete = "!this.hasAttachment()";
		  
		//Messages can only be deleted if properly flagged and they don't have an attachment
		switch(type){
			case "s":
			console.warn("we got here");
				this._canDelete = "$gameSwitches.value(" + flagList[1] + ") && !this.hasAttachment()";
				break;
			case "n":
				this._canDelete = "false";
				break;
			case "v":
				this._canDelete = "$gameVariables.value(" + flagList[1] + ") " + JKMail.getFlagOperator(flagList[2]) + " " + flagList[3];
				break;
			case "j"://script call
				this._canDelete = triggerList.slice(1).join(","); //Just in case we sliced extra commas by mistake
				break;
			default:
				this._canDelete = "!this.hasAttachment()";
				break;
		  }
	}
	return eval(this._canDelete);
};

JK_Message.prototype.canClaimAttachment = function(){
  return this.hasAttachment() && this.isRead();
};

JK_Message.prototype.claimAttachment = function(){
  if(typeof this._attachment === "number"){//Adding gold
    $gameParty.gainGold(this._attachment);
  }
  else{//Adding item
    $gameParty.gainItem(this._attachment, 1);
  }
  this._attachment = null;
  this._hasAttachment = false;
};
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
// End Class Declaration
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:

//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
//JKMail

//Anonymous class used to store plugin parameters
//:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:-:
(function($) {
  "use strict";
  var JKParams = PluginManager.parameters('JK_MailSystem');
  $.Param = {};
  
  $.Param.MailBoxLength = Number(JKParams["MailBoxLength"]);
  $.Param.MailBoxName = JSON.parse(JKParams['MailBoxNames']);
  $.Param.UnreadText = JKParams['UnreadText'];
  $.Param.NoMailText = JKParams['NoMailText'];
  $.Param.FromText = JKParams['FromText'];
  $.Param.SubjectText = JKParams['SubjectText'];
  $.Param.NoAttachmentText = JKParams['NoAttachmentText'];
  $.Param.AttachmentText = JKParams['AttachmentText'];
  $.Param.UnreadTextColor = Number(JKParams['UnreadTextColor']);
  $.Param.MailHeaderTextColor = Number(JKParams['MailHeaderTextColor']);
  $.Param.OverrideDeleteFlag = Number(JKParams['OverrideDeleteFlag']);
  $.Param.DefaultScroll = Number(JKParams['DefaultScroll']);

  $.getFlagOperator = function(operator){
	switch(operator){
			case 0:
				return "===";
			case 1:
				return ">";
			case 2:
				return ">=";
			case 3:
				return "<";
			case 5:
				return "<=";
			case 6:
				return "!==";
			default:
				return "===";
	}
  };
  // Mailbox variable to be used by other plugins or entities.
  $.InitializeMailBoxes = function(){
    $.MailBox = [];
    for(var i = 0; i < $.Param.MailBoxLength; i++){
      var MailBox = new JK_MailBox();
      MailBox.description = $.Param.MailBoxName[i];
      $.MailBox.push(MailBox);
    }
    $.activeMailBox = $.MailBox[0];
  };

  $.isMailRead = function(id){
    return $.activeMailBox.isMailRead(id);
  };

  $.isMailReadInBox = function(box, id){
    return $.MailBox[box].isMailRead(id);
  };

  $.hasMailInBox = function(box, id){
    return $.MailBox[box].hasMail(id);
  };

  $.hasMail = function(id){
    return $.activeMailBox.hasMail(id);
  };

  $.hasUnreadMail = function(box){
    return $.MailBox[box].getNumberUnread() > 0;
  };

  //Gets the Subject of the specified letter by ID
  $.getSubject = function(id){
    return $dataMail[id].subject;
  };

  //Gets the sender of the specified letter by ID
  $.getSender = function(id){
    return $dataMail[id].sender;
  };

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args)
  {
    switch(command)
    {
      case "MailAdd":
		  var mailID = Number(args[0]);
		  if(args.length == 1)
		  {
			//Add to the first Mailbox
			$.MailBox[0].addMail(mailID);
		  }
		  else if(args.length > 1)
		  {
			for(var i  = 1; i < args.length; i++)
			{
			  $.MailBox[args[i]].addMail(mailID);
			}
		  }
		  else
		  {
			console.error("Usage: MailAdd #mailID #mailboxA #mailboxB . . .");
		  }
		  //do the function
		  break;
      case "MailAddAll":
		  if(args.length > 0)
		  {
			for(var j = 0; j < $.MailBox.length; j++)
			{
			  for(var i = 0; i < args.length; i++)
			  {
				$.MailBox[j].addMail(args[i]);
			  }
			}
		  }
		  else
		  {
			console.error("Usage: #MessageA #MessageB #MessageC ...");
		  }
		  break;
      case "MailBoxAdd":
		  var boxID = Number(args[0]);
		  if(args.length > 1)
		  {
			for(var i  = 1; i < args.length; i++)
			{
			  $.MailBox[boxID].addMail(args[i]);
			}
		  }
		  else
		  {
			console.error("Usage: #MailBoxID #MessageA #MessageB ...");
		  }
		  break;
      case "MailRemove":
		  var mailID = Number(args[0]);
		  var m = (args.length > 1) ? Number(args[1]) : 0;
		  $.MailBox[m].removeMail(mailID);
		  //do the function
		  break;
      case "MailRead":
		  var mailID = Number(args[0]);
		  var m = (args.length > 1) ? Number(args[1]) : 0;
		  $.MailBox[m].changeRead(mailID, true);
      break;
	  case "MailUnread":
		  var mailID = Number(args[0]);
		  var m = (args.length > 1) ? Number(args[1]) : 0;
		  $.MailBox[m].changeRead(mailID, false);
		break;
      case "MailBoxOpen":
		  var m = Number(args[0]);
		  $.activeMailBox = $.MailBox[m];
		  SceneManager.push(Scene_Mail);
		  break;
      default:
		_Game_Interpreter_pluginCommand.call(this, command, args);
      break;
    }
  };

  var JKCreateGameObjects = DataManager.createGameObjects;
  DataManager.createGameObjects = function() {
    JKCreateGameObjects.call(this);
    $.InitializeMailBoxes();
  };

  var JKSaveContents = DataManager.makeSaveContents;
  DataManager.makeSaveContents = function(){
    var contents = JKSaveContents.call(this);
    contents.mailbox = [];
    for(var i = 0; i < $.Param.MailBoxLength; i++){
      contents.mailbox.push($.MailBox[i]._mailList);
    }
    return contents;
  };

  var JKLoadContents = DataManager.extractSaveContents;
  DataManager.extractSaveContents = function(contents){
    JKLoadContents.call(this,contents);
    for(var i = 0; i < $.Param.MailBoxLength; i++)
    {
      $.MailBox[i].loadSavedMail(contents.mailbox[i]);
      console.warn($.MailBox[i]);
    }
  };
})(JKMail);

Imported["JKMail"] = 2.2;
