var aPlayers = [];
var aChestCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var aChanceCards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
var aAvatars = ["car", "dog", "cart", "boat", "shoe", "hat", "thimble", "iron"];
var sTradeMode = "";

$(function() {
    var eContainer = $('#content');

    createBoard(eContainer);
    createMenu();
    shuffleCards(aChanceCards);
    shuffleCards(aChestCards);
})

function createBoard(container) {
    var eModalQuitDialog = $('<div id="modalQuitDialog" class="dialog" title="Quit Game?"></div>');
    var eModalJailDialog = $('<div id="modalJailDialog" class="dialog" title="Warning!"></div>');
    var eModalBankruptDialog = $('<div id="modalBankruptDialog" class="dialog" title="Bankrupt!"></div>');
    var eModalSellDialog = $('<div id="modalSellDialog" class="dialog" title="Warning!"></div>');
    var eModalChanceDialog = $('<div id="modalChanceDialog" class="dialog" title="Warning!"></div>');
    var eModalChestDialog = $('<div id="modalChestDialog" class="dialog" title="Warning!"></div>');
    var eDiceDialog = $('<div id="diceDialog" class="dialog" title="Doubles!"></div>');
    var eChanceCardDialog = $('<div id="chanceCardDialog" class="dialog" title="Chance Card"></div>');
    var eChestCardDialog = $('<div id="chestCardDialog" class="dialog" title="Community Chest Card"></div>');
    var eTurnDialog = $('<div id="turnDialog" class="dialog" title="New Turn"></div>');
    var eBuyDialog = $('<div id="buyDialog" class="dialog"  title="Buy Property"></div>');
    var eWarningDialog = $('<div id="warningDialog" class="dialog" title="Warning!"></div>');
    var eGoDialog = $('<div id="goDialog" class="dialog" title="Go!"></div>');
    var eMonopolyDialog = $('<div id="monopolyDialog" class="dialog" title="Monopoly!"></div>');
    var eJailDialog = $('<div id="jailDialog" class="dialog" title="Jail!"></div>');
    
    var eBoard = $('<div id="board" class="board"></div>');
    var eTopBar = $('<div id="topBar" class="horBar"></div>');
    var eLeftBar = $('<div id="leftBar" class="verBar"></div>');
    var eCenter = $('<div id="center" class="center"></div>');
    var eRightBar = $('<div id="rightBar" class="verBar"></div>');
    var eBottomBar = $('<div id="bottomBar" class="horBar"></div>');

    container.append(eBoard);
    eBoard.append(eTopBar)
        .append(eLeftBar)
        .append(eCenter)
        .append(eRightBar)
        .append(eBottomBar);
    container.append(eModalQuitDialog)
        .append(eModalJailDialog)
        .append(eModalBankruptDialog)
        .append(eModalSellDialog)
        .append(eModalChanceDialog)
        .append(eModalChestDialog)
        .append(eDiceDialog)
        .append(eChanceCardDialog)
        .append(eChestCardDialog)
        .append(eTurnDialog)
        .append(eBuyDialog)
        .append(eWarningDialog)
        .append(eGoDialog)
        .append(eMonopolyDialog)
        .append(eJailDialog);

// TOP ROW //
    var eStart = $('<div id="tile0" class="corner start"></div>');
    eTopBar.append(eStart);
    var eStartAvatarBox = $('<div id="avatarBox0" class="avatarBox topAvatarBox leftAvatarBox"></div>');
    eStart.append(eStartAvatarBox);

    for (var i = 1; i <= 9; i++) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getString(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');
        
        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox topAvatarBox"></div>');
        var eHorAssetBox = $('<div id="assetBox' + i + '" class="horAssetBox"></div>');

        eTopBar.append(eHorTile);
        eHorTile.append(eTileBody);
        eHorTile.append(eHorAssetBox);
        eHorTile.append(eAvatarBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);
    }
    
    var eJail = $('<div id="tile10" class="corner jail"></div>');
    $(eTopBar).append(eJail);
    var eJailAvatarBox = $('<div id="avatarBox10" class="avatarBox topAvatarBox"></div>');
    $(eJail).append(eJailAvatarBox);
// RIGHT ROW //
    for (var i = 11; i <= 19; i++) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileRight ' + getString(aoTiles[i].type) + ' ' + getString(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox"></div>');
        var eVerAssetBox = $('<div id="assetBox' + i + '" class="verAssetBox rightAssetBox"></div>');

        eRightBar.append(eVerTile);
        eVerTile.append(eTileBody);
        eVerTile.append(eAvatarBox);
        eVerTile.append(eVerAssetBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);    
    }
// BOTTOM ROW //
    var eCop = $('<div id="tile30" class="corner cop"></div>');
    eBottomBar.append(eCop);
    var eCopAvatarBox = $('<div id="avatarBox30" class="avatarBox leftAvatarBox"></div>');
    eCop.append(eCopAvatarBox);

    for (var i = 29; i >= 21; i--) {
        var eHorTile = $('<div id="tile' + i + '" class="horTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody tileBottom ' + getString(aoTiles[i].type) + ' ' + getString(aoTiles[i].utility) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox"></div>');
        var eHorAssetBox = $('<div id="assetBox' + i + '" class="horAssetBox bottomAssetBox"></div>');

        eBottomBar.append(eHorTile);
        eHorTile.append(eTileBody);
        eHorTile.append(eAvatarBox);
        eHorTile.append(eHorAssetBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);
    }
    
    var ePark = $('<div id="tile20" class="corner park"></div>');
    eBottomBar.append(ePark);
    var eParkAvatarBox = $('<div id="avatarBox20" class="avatarBox"></div>');
    ePark.append(eParkAvatarBox);
// LEFT ROW //
    for (var i = 39; i >= 31; i--) {
        var eVerTile = $('<div id="tile' + i + '" class="verTile ' + getString(aoTiles[i].color) + '"></div>');
        var eTileBody = $('<div class="tileBody ' + getString(aoTiles[i].type) + '"></div>');
        var eTileBodyName = $('<p class="tileName">' + getString(aoTiles[i].name) + '</p>');
        var eTileBodyPrice = $('<p class="tilePrice">' + getString(aoTiles[i].price) + '</p>');

        var eAvatarBox = $('<div id="avatarBox' + i + '" class="avatarBox leftAvatarBox"></div>');
        var eVerAssetBox = $('<div id="assetBox' + i + '" class="verAssetBox"></div>');

        eLeftBar.append(eVerTile);
        eVerTile.append(eTileBody);
        eVerTile.append(eVerAssetBox);
        eVerTile.append(eAvatarBox);
        eTileBody.append(eTileBodyName);
        eTileBody.append(eTileBodyPrice);
    }
// EVENT LISTENER //  
    $("div[id^='tile']").click(function() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showTileInfo(nId);
        showTileSelected(nId);
        if (aoTiles[nId].owner >= 0) {
            if (sTradeMode != "Trade") {
                showPlayerInfo();
                showPlayerSelected(aoTiles[nId].owner);
                showPlayerAssets(aoTiles[nId].owner);
                showPlayerOwned(aoTiles[nId].owner, $('#center'));
            }// if not in trade mode //
            else {
                if (aoTiles[nId].owner != aPlayers[0]) {
                    showTraderSelected(aoTiles[nId].owner, "Right");
                    showPlayerOwned(aoTiles[nId].owner, $('#tradeRight'));
                    $('#tradeCreditsLeft').css('display', 'block');
                    $('#tradeCreditsRight').css('display', 'block');
                    $('#tradeRight').find('#property' + nId).addClass('propertyHighLight');
                }// if owner is trade secondary //
                else {
                    $('#tradeLeft').find('#property' + nId).addClass('propertyHighLight');
                }// if owner is trade primary //
            }// in trade mode //
        }// if tile has owner //
        else {
            $('#tradeAvatarBoxRight').find('.traderHighLight').removeClass('traderHighLight');
            $('#tradeRight').find('.properties').remove();
            $('#tradeCreditsLeft').css('display', 'none');
            $('#tradeCreditsRight').css('display', 'none');
        }// if tile has no owner
    });
}/////////////////////////////// CREATE BOARD //
function createMenu() {
    var eCenter = $('#center');
    var eMenu = $('<div id="menu" class="menu"></div>');
    var eDice = $('<div id="dice" class="menuAction"></div>');
    var eAction = $('<div id="action" class="menuAction"></div>');

    var eDieOne = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + Math.floor(Math.random() * 6 + 1) + '"></div>');
    var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Play Game</button>');

    eCenter.append(eMenu);
    eMenu.append(eDice);
    eMenu.append(eAction);  
    eDice.append(eDieOne);
    eDice.append(eDieTwo);
    eAction.append(eActionButton);

    $(eActionButton).click(function() { playGame(); });
}////////////////////////////////////////// CREATE MENU //

function playGame() {
    var eCenter = $('#center');
    var eStartMenu = $('<div id="startMenu" class="startMenu"></div>');
    eCenter.append(eStartMenu);
    for (var i = 0; i < 6; i++) {
        var eStartMenuPlayer = $('<div id="startMenuPlayer' + i + '" class="startMenuPlayer"></div>');
        var eStartMenuNavLeft = $('<div class="startMenuNav"></div>');
        var eStartMenuNavLeftDo = $('<div id="startMenuNavLeft' + i + '" class="startMenuNavButton left"></div>');
        var eStartMenuAvatar = $('<div id="startMenuAvatar' + i + '" class="chance"></div>');
        var eStartMenuNavRight = $('<div class="startMenuNav"></div>');
        var eStartMenuNavRightDo = $('<div id="startMenuNavRight' + i + '" class="startMenuNavButton right"></div>');
        var eStartMenuDice = $('<div id="startMenuDice' + i + '" class="startMenuDice"></div>');
        eStartMenu.append(eStartMenuPlayer);
        eStartMenuPlayer.append(eStartMenuNavLeft)
            .append(eStartMenuAvatar)
            .append(eStartMenuNavRight)
            .append(eStartMenuDice);
        eStartMenuNavLeft.append(eStartMenuNavLeftDo);
        eStartMenuNavRight.append(eStartMenuNavRightDo);
    }// create avatar choice //
    $("div[id^='startMenuNav']").click(function() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        var sClass = $('#startMenuAvatar' + nId).attr('class');
        $('#startMenuAvatar' + nId).removeClass();

        if (this.id.match(/Left/gi)) { var sSide = "Left"; }
        if (this.id.match(/Right/gi)) { var sSide = "Right"; }
        switch(sSide) {
            case "Left":
                aAvatars.unshift(aAvatars.pop());
                if (aAvatars[0] == sClass) { aAvatars.unshift(aAvatars.pop()); }
                $('#startMenuAvatar' + nId).addClass(aAvatars[0]);
                aAvatars.splice(0, 1);
                if (!(sClass == "chance" && aAvatars.indexOf("chance") >= 0)) { aAvatars.unshift(sClass); }
            break;
            case "Right":
                if (aAvatars[0] == sClass) { aAvatars.push(aAvatars.shift()); }
                $('#startMenuAvatar' + nId).addClass(aAvatars[0]);             
                aAvatars.splice(0, 1);
                if (!(sClass == "chance" && aAvatars.indexOf("chance") >= 0)) { aAvatars.push(sClass); }
            break;
        }// click left or right arrows //
        if (aAvatars.indexOf("chance") == -1) { aAvatars.push("chance"); }
        aoPlayers[nId].avatar = $('#startMenuAvatar' + nId).attr('class');
    });// eventlistener avatar navigation buttons //

    var eAction = $('#action');
    var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
    eAction.empty();
    eAction.append(eActionButton);
    $(eActionButton).click(function() {
        if (6 - $('#startMenu').find('.chance').length >= 2) {
            var aThrows = [];
            var aPlaying = [];
            $("div[id^='startMenuNav']").remove();
            for (var i = 0; i < 6; i++) {
                var sSet = "no";
                if ($('#startMenuAvatar' + i).attr('class') != "chance") {
                    do {
                        $('#startMenuDice' + i).empty();
                        var nTotal = 0;
                        for (var j = 0; j < 2; j++) {
                            var nDie = Math.floor(Math.random() * 6 + 1);
                            var eStartMenuDie = $('<div class="startMenuDie die-' + nDie + '"></div>');
                            nTotal += nDie;
                            $('#startMenuDice' + i).append(eStartMenuDie);
                        }// throws //
                        if (aThrows.indexOf(nTotal) == -1) {
                            aThrows.push(nTotal);
                            sSet = "yes";
                            aPlaying.push(i);
                        }
                    }// keep throwing until each player has a different throw //
                    while (sSet == "no");
                }// if not still default avatar choice //
                else { $('#startMenuPlayer' + i).remove(); }// remove unchosen players //
            }// go over avatar choices //
            var aPosition = aThrows.slice(0);
            aPosition.sort(sortNumber);
            for (var i = 0; i < aPosition.length; i++) { aPlayers[aPosition.indexOf(aThrows[i])] = aPlaying[i]; }
            var eAction = $('#action');
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Start Game</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                eStartMenu.remove();
                startGame();
            });
        }// make certain there are enough players //
        else { showDialog("You need to have at least 2 players to play a game!", "warning"); }
    });// eventlistener throw dice to decide play order //
}
function startGame() {
//    console.log("startGame");
    var eCenter = $('#center');
    var eMenu = $('#menu');
    var eInfo = $('<div id="info" class="info"></div>');
    var eTrade = $('<div id="trade" class="menuAction"></div>');
    var eQuit = $('<div id="quit" class="menuAction"></div>');
    var eTradeButton = $('<button type="button" id="tradeButton" class="actionButton">Trade</button>');
    var eQuitButton = $('<button type="button" id="quitButton" class="actionButton">Quit</button>');
    var ePlayers = $('<div id="players" class="menuPlayers"></div>');
    
    eCenter.append(eInfo);
    eMenu.append(eTrade)
        .append(eQuit)
        .append(ePlayers);

    eTrade.append(eTradeButton);
    eQuit.append(eQuitButton);
    $(eTradeButton).click(function() {
        startTrade();
    });// trade event listener //
    $(eQuitButton).click(function() {
        exitGame();
    });// quit event listener //
    showAvatars();
    aPlayers.unshift(aPlayers.pop());
    playerNext();
}/////////////////////////////////////////// START GAME //
function exitGame() {
    var nPlayer = aPlayers[0];
    var eModalDialog = $('#modalQuitDialog');
    eModalDialog.empty()
        .append('<p>' + aoPlayers[nPlayer].name + ', are you sure you wish to quit the game?</p>')
        .dialog({
            modal: true,
            dialogClass: "no-close",
            buttons: [
                { text: "Quit",
                    click: function() {
                        playerEnd();
                        $(this).dialog("close");
                    }
                },
                { text: "Cancel",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        });
}//////////////////////////////////////////// QUIT GAME DIALOG //
function startTrade() {
    sTradeMode = "Trade";
    $('.asset').remove();
    $('.avatar').remove();
    $('.tileHighLight').removeClass("tileHighLight");
    $("div[id^='tile']").removeClass("greenLed").removeClass("yellowLed").removeClass("redLed").removeClass("blueLed");
    
    var eCenter = $('#center');
    var eTrade = $('<div id="tradeView" class="trade"></div>');
    var eTradeAvatarBoxLeft = $('<div id="tradeAvatarBoxLeft" class="tradeAvatarBox tradeAvatarBoxLeft"></div>');
    var eTradeAvatarBoxRight = $('<div id="tradeAvatarBoxRight" class="tradeAvatarBox tradeAvatarBoxRight"></div>');
    var eTradeAvatarBoxRightFloat = $('<div class="tradeAvatarFloat"></div>');
    var eTradeMenu = $('<div id="tradeMenu" class="tradeMenu"></div>');
    var eTradeBarLeft = $('<div id="tradeLeft" class="tradeBar tradeBarLeft"></div>');
    var eTradeInfo = $('<div id="infoTrade" class="info"></div>');
    var eTradeInfoHead = $('<div id="infoHead" class="infoHead"><h3>Trading Rules</h3></div>');
    var eTradeInfoBody = $('<div id="infoBody" class="infoBody"><p>Unimproved properties, railroads, utilities (but not buildings) and \'Get out of Jail\'-cards may be traded. However, no property can be sold to another player if buildings are standing on any properties of that color-group.</p></div>');
    var eTradeBarRight = $('<div id="tradeRight" class="tradeBar tradeBarRight"></div>');
    var eTradeCreditsLeft = $('<div id="tradeCreditsLeft" class="tradeCredits"></div>');
    var eTradeCreditsRight = $('<div id="tradeCreditsRight" class="tradeCredits"></div>');
    eCenter.append(eTrade)
    eTrade.append(eTradeAvatarBoxLeft)
        .append(eTradeMenu)
        .append(eTradeAvatarBoxRight)
        .append(eTradeBarLeft)
        .append(eTradeInfo)
        .append(eTradeBarRight);
    eTradeInfo.append(eTradeInfoHead)
        .append(eTradeInfoBody);
    eTradeAvatarBoxRight.append(eTradeAvatarBoxRightFloat);
    eTradeBarLeft.append(eTradeCreditsLeft);
    eTradeBarRight.append(eTradeCreditsRight);
    for (var i = 0; i < 4; i++) {
        var eTradeCreditsDigitLeft = $('<div id="changeUpLeft' + i + '" class="tradeCreditChange up"></div>');
        var eTradeCreditsDigitRight = $('<div id="changeUpRight' + i + '" class="tradeCreditChange up"></div>');
        eTradeCreditsLeft.append(eTradeCreditsDigitLeft);
        eTradeCreditsRight.append(eTradeCreditsDigitRight);
    }// amount up //
    for (var i = 0; i < 4; i++) {
        var eTradeCreditsDigitLeft = $('<div class="tradeCreditDigit number"><p id="creditLeft' + i + '">0</p></div>');
        var eTradeCreditsDigitRight = $('<div class="tradeCreditDigit number"><p id="creditRight' + i + '">0</p></div>');
        eTradeCreditsLeft.append(eTradeCreditsDigitLeft);
        eTradeCreditsRight.append(eTradeCreditsDigitRight);
    }// amount //
    for (var i = 0; i < 4; i++) {
        var eTradeCreditsDigitLeft = $('<div id="changeDownLeft' + i + '" class="tradeCreditChange down"></div>');
        var eTradeCreditsDigitRight = $('<div id="changeDownRight' + i + '" class="tradeCreditChange down"></div>');
        eTradeCreditsLeft.append(eTradeCreditsDigitLeft);
        eTradeCreditsRight.append(eTradeCreditsDigitRight);
    }// amount down //

    var eExitButton = $('<button type="button" id="exitButton" class="actionButton">Exit</button>');
    eTradeMenu.append(eExitButton);
    $(eExitButton).click(function() {
        exitTrade();
    }); 
    
    var eTradeButton = $('<button type="button" id="tradeButton" class="actionButton">Accept Trade</button>');
    eTradeMenu.append(eTradeButton);
    $(eTradeButton).click(function() {
        doTrade();
    });
    
    var eAvatarLeft = $('<div id="avatarLeft' + aPlayers[0] + '" class="tradeAvatar ' + aoPlayers[aPlayers[0]].avatar + '"></div>');
    eTradeAvatarBoxLeft.append(eAvatarLeft);
    for (var i = 1; i < aPlayers.length; i++) {
        var eAvatarRight = $('<div id="avatarRight' + aPlayers[i] + '" class="tradeAvatar ' + aoPlayers[aPlayers[i]].avatar + '"></div>');
        eTradeAvatarBoxRightFloat.append(eAvatarRight);
    }
    eTradeAvatarBoxRightFloat.css('width', 48 * (aPlayers.length - 1));
    eTradeCreditsLeft.css('display', 'none');
    eTradeCreditsRight.css('display', 'none');
    
    showPlayerOwned(aPlayers[0], $('#tradeLeft'));
    $('#avatarRight' + aPlayers[0]).remove();
    showPlayerAssets(aPlayers[0]);
    
    $("div[id^='avatarRight']").click(function () {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        eTradeCreditsLeft.css('display', 'block');
        eTradeCreditsRight.css('display', 'block');
        showPlayerOwned(nId, $('#tradeRight'));
        showTraderSelected(nId, "Right");
    });
    $("div[id^='change']").click(function () {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        if (this.id.match(/Left/gi)) { var sSide = "Left"; }
        if (this.id.match(/Right/gi)) { var sSide = "Right"; }
        if (this.id.match(/Up/gi)) { var sHow = "Up"; }
        if (this.id.match(/Down/gi)) { var sHow = "Down"; }
        var nAmount = parseInt($('#credit' + sSide + nId).text());
        switch (sHow) {
            case "Up": if (nAmount < 9) { $('#credit' + sSide + nId).text(nAmount + 1); } break;
            case "Down": if (nAmount > 0) { $('#credit' + sSide + nId).text(nAmount - 1) }; break;
        }
    });
    
}
function exitTrade() {
    sTradeMode = "";
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location
    var eTradeView = $('#tradeView');
    eTradeView.remove();
    showAll(nLocation, nPlayer)
    showAvatars();
}
function doTrade() {
    if ($('.traderHighLight').attr('id')) {
        var nPlayer = aPlayers[0];
        var nTrader = $('.traderHighLight').attr('id').match(/\d+/)[0];
        var nLeft = 0;
        var nRight = 0;
        
        for (var i = 0; i < 4; i++) {
            nRight += (parseInt($('#creditRight' + i).text()) * Math.pow(10, (3 - i)));
            nLeft += (parseInt($('#creditLeft' + i).text()) * Math.pow(10, (3 - i)));
        }
        if ($('.propertyHighLight').length > 0 && aoPlayers[nPlayer].credits >= nLeft && aoPlayers[nTrader].credits >= nRight) {
            aoPlayers[nPlayer].credits -= nLeft;
            aoPlayers[nPlayer].credits += nRight;
            aoPlayers[nTrader].credits += nLeft;
            aoPlayers[nTrader].credits -= nRight;
            $('#tradeLeft').find('.propertyHighLight').each(function() {
                var nId = this.id.match(/\d+/)[0];
                var sId = this.id.match(/card/gi);
                if (sId == "card") {
                    aoPlayers[nPlayer].cards[nId] = 0;
                    aoPlayers[nTrader].cards[nId] = 1;
                }
                else { aoTiles[nId].owner = nTrader; }
            });
            $('#tradeRight').find('.propertyHighLight').each(function() {
                var sId = this.id.match(/card/gi);
                var nId = this.id.match(/\d+/)[0];
                if (sId == "card") {
                    aoPlayers[nPlayer].cards[nId] = 1;
                    aoPlayers[nTrader].cards[nId] = 0;
                }
                else { aoTiles[nId].owner = nPlayer; }
            });
            exitTrade();
        }
        else {
            var sText = "";
            if ($('.propertyHighLight').length == 0) { sText += "You can only trade for cards or properties!<br>"; }
            if (aoPlayers[nPlayer].credits < nLeft) { sText += aoPlayers[nPlayer].name + ", you don't have enough credits for that!<br>"; }
            if (aoPlayers[nTrader].credits < nRight) { sText += aoPlayers[nTrader].name + ", you don't have enough credits for that!"; }
            showDialog(sText, "warning");
        }
    }
    else {
        showDialog("You need to choose someone to trade with!", "warning");
    }
}

function playerTurn() {
//    console.log(" -playerTurn");
    var nPlayer = aPlayers[0];
    var eAction = $('#action');
    var nLocation = aoPlayers[nPlayer].location;
    var nPriority = aoPlayers[nPlayer].priority;
    var nWealth = checkWealth(nPlayer);
    var sStart = aoPlayers[nPlayer].start;
    var sRoll = aoPlayers[nPlayer].roll;
    var sChance = aoPlayers[nPlayer].chance;
    var sChest = aoPlayers[nPlayer].chest;
    var sPay = aoPlayers[nPlayer].pay;
    var nJail = aoPlayers[nPlayer].jail;

    if (sStart == "yes") {
        if (sRoll == "yes") {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                playerThrow();
                playerReset();
                if (aoPlayers[nPlayer].doubles > 0) { showDialog('You have rolled doubles, throw again!', 'dice'); }
                aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                playerMove();
            });// throw dice event listener //
        }// if player is allowed to throw dice //
        if (nJail > 0) {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                playerThrow();
                aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                if (aoPlayers[nPlayer].doubles == 1) {
                    aoPlayers[nPlayer].doubles = 0;
                    aoPlayers[nPlayer].jail = 0;
                    aoPlayers[nPlayer].roll = "no";
                    showTileInfo(10);
                    playerReset();
                    showDialog('You have rolled doubles, you can leave jail!', 'dice');
                    playerMove();
                }// if allowed to leave jail by throwing doubles //
                else {
                    aoPlayers[nPlayer].start = "no";
                    aoPlayers[nPlayer].jail += 1;
                    if (aoPlayers[nPlayer].jail < 4) {
                        showDialog('You haven\'t rolled doubles, you must remain in jail!', 'jail');
                        showTileInfo(10);
                        playerTurn();
                    }// if third turn in jail //
                    else {
                        showDialog('You haven\'t rolled doubles, you must pay the fine!', 'jail');
                        showTileInfo(10);
                        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay 50</button>');
                        eAction.empty();
                        eAction.append(eActionButton);
                        $(eActionButton).click(function() {
                            payFine();
                        });// pay fine event listener //
                    }// if still can try to throw doubles next round //
                }// has to stay in jail for not throwing doubles //
            });// throw dice to get out of jail event listener //
        }// if player is in jail //
        if (nPriority > 0) {
            if (nPriority > nWealth) { playerBankrupt(); }// if debt outweighs total asset value of player //
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nPriority +  '</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                payDebt(nPriority);
            });// pay debt event listener //
        }// if player has priority debt //
    }// beginning of turn phase //
    else {
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Next player</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            playerNext();
        });
        
        if (sRoll == "yes") {
            var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Roll Dice</button>');
            eAction.empty();
            eAction.append(eActionButton);
            $(eActionButton).click(function() {
                playerThrow();
                playerReset();
                if (aoPlayers[nPlayer].doubles == 0) {
                    aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                    playerMove();
                }// if not thrown doubles after rethrow //
                if (aoPlayers[nPlayer].doubles == 1 || aoPlayers[nPlayer].doubles == 2) {
                    showDialog('You have rolled doubles, throw again!', 'dice');
                    aoPlayers[nPlayer].to = (nLocation + aoPlayers[nPlayer].dice) % 40;
                    playerMove();
                }// doubles again after first throw //
                if (aoPlayers[nPlayer].doubles == 3) {
                    playerJail('You have been sent to Jail for rolling three doubles in a row!');
                    showAvatars();
                    showAll(aoPlayers[nPlayer].location, nPlayer);
                    playerTurn();
                }// three doubles in a row //
            });// throw dice event listener //
        }// if player can throw dice again //
        if (sPay == "yes") {
            setDebt();
            var nDebt = checkPlayerDebt() + checkBankDebt();
            if (nDebt > nWealth) { playerBankrupt(); }// if debt outweight total asset value //
            if (nDebt > 0) { 
                var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Pay ' + nDebt +  '</button>');
                eAction.empty();
                eAction.append(eActionButton);
                $(eActionButton).click(function() {
                    payDebt(nDebt);
                });// pay debt event listener //
            }// if player has debt //   
        }// if player is allowed to potentially pay debt //
        if (sChest == "yes" && aoTiles[nLocation].type == "chest") { playerDraw(0); }// if player landed on community chest //
        if (sChance == "yes" && aoTiles[nLocation].type == "chance") { playerDraw(1); }// if player landed on chance //
    }// after first throw phase //
    
    if (aPlayers.length == 1) {
        showDialog(aoPlayers[aPlayers[0]].name + ", you have won the game!", "warning");
        var eActionButton = $('<button type="button" id="actionButton" class="actionButton">Quit Game</button>');
        eAction.empty();
        eAction.append(eActionButton);
        $(eActionButton).click(function() {
            location.reload();
        });
    }
}///////////////////////////////////////// PLAY TURN //
function playerThrow() {
//    console.log("playerThrow");
    var nPlayer = aPlayers[0];
    
    var eDice = $('#dice');
    var nDieOne = Math.floor(Math.random() * 6 + 1);
    var nDieTwo = Math.floor(Math.random() * 6 + 1);
    aoPlayers[nPlayer].dice = nDieOne + nDieTwo;
    var eDieOne = $('<div id="dieOne" class="die die-' + nDieOne + '"></div>');
    var eDieTwo = $('<div id="dieOne" class="die die-' + nDieTwo + '"></div>');

    eDice.empty();
    eDice.append(eDieOne);
    eDice.append(eDieTwo);

    if (nDieOne == nDieTwo) {////////////////////////////////////////////////// if rolled doubles //
        aoPlayers[nPlayer].roll = "yes";
        aoPlayers[nPlayer].doubles += 1;
    }// if doubles //
    else {///////////////////////////////////////////////////////////////////// if not rolled doubles //
        aoPlayers[nPlayer].roll = "no";
        aoPlayers[nPlayer].doubles = 0;
    }// if not doubles //
}///////////////////////////////////////// THROW DICE //
function playerEnd() {
    var nPlayer = aPlayers[0];
    var nDebt = checkPlayerDebt();
    var nDebtees = 0;
    var nDebtee;
    for (var i = 0; i < 6; i++) {
        if (aoPlayers[nPlayer].debt[i] > 0) {
            nDebtees += 1;
            nDebtee = i;
        }// if player has debt //
    }// # of debtees //
    
    for (var i = 0; i < 6; i++) {
        if (nDebtees > 1) {
            if (Math.floor(checkWealth(nPlayer) / (aPlayers.length - 1)) >= aoPlayers[nPlayer].debt[i]) {
                aoPlayers[i].credits += aoPlayers[nPlayer].debt[i];
            }// if debt outweight total asset value //
            else {
                aoPlayers[i].credits += Math.floor(checkWealth(nPlayer) / (aPlayers.length - 1));
            }// if debt within player value //
        }// if more than one debtee //
        if (nDebtees == 1) {
            if (aoPlayers[nPlayer].debt[i] != 0) {
                if (aoPlayers[nPlayer].credits >= aoPlayers[nPlayer].debt[i]) {
                    aoPlayers[i].credits += aoPlayers[nPlayer].debt[i];
                    nDebt = 0;
                }
                else {
                    aoPlayers[i].credits += aoPlayers[nPlayer].credits;
                    nDebt -= aoPlayers[nPlayer].credits;
                }
            }
        }// if only one debtee //
    }// pay off debt to players //
    for (var i = 0; i < aoTiles.length; i++) {
        if (nDebtees == 1 && aoTiles[i].owner == nPlayer) {
            if (nDebt >= checkValue(i)) {
                aoTiles[i].owner = nDebtee;
                nDebt -= checkValue(i);
            }// if still debt after giving this tile //
            else {
                aoPlayers[nDebtee].credits += nDebt;
                nDebt = 0;
            }// if this tile covers the last of the debt //
        }// if one debtee and debtor owns this tile //
        if (aoTiles[i].owner == nPlayer) {
            delete aoTiles[i].assets;
            delete aoTiles[i].owner;
        }// delete ownership and assets of tile //
    }// go over tiles, transfer/remove ownership/assets //
    
    aPlayers.splice(0, 1);
    aPlayers.unshift(aPlayers.pop());
    $('#player' + nPlayer).remove();
    playerNext();
}/////////////////////////////////////////// REMOVE PLAYER FROM GAME AND RESOLVE DEBT //
function playerSet() {
    var nPlayer = aPlayers[0];
    aoPlayers[nPlayer].roll = "yes";
    aoPlayers[nPlayer].buy = "no";
    aoPlayers[nPlayer].pay = "no";
    aoPlayers[nPlayer].chest = "no";
    aoPlayers[nPlayer].chance = "no";
    aoPlayers[nPlayer].doubles = 0;
}//////////////////////////////////////////// PLAYER SET END OF TURN TURN //
function playerReset() {
    var nPlayer = aPlayers[0];
    aoPlayers[nPlayer].start = "no";
    aoPlayers[nPlayer].buy = "yes";
    aoPlayers[nPlayer].pay = "yes";
    aoPlayers[nPlayer].chest = "yes";
    aoPlayers[nPlayer].chance = "yes";
}////////////////////////////////////////// PLAYER RESET AFTER THROW //
function playerMove() {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var nTo = aoPlayers[nPlayer].to;
    $('#action').empty();

    if (nLocation != nTo) { setTimeout(showMovement, 40); }// if still moving //
    else {
        if (nTo == 30) { playerJail('You have been sent to Jail because you landed on Go to Jail!'); }// if landed on go to jail //
        showAvatars();
        showAll(aoPlayers[nPlayer].location, nPlayer);
        playerTurn();
    }// if arrived at destination //
}////////////////////////////////////////// MOVE PLAYER //
function playerJail(text) {
    var nPlayer = aPlayers[0];
    playerSet();
    aoPlayers[nPlayer].jail = 1;
    aoPlayers[nPlayer].doubles = 0;
    aoPlayers[nPlayer].location = 10
    aoPlayers[nPlayer].roll = "no";
    
    var eModalDialog = $('#modalJailDialog');
    eModalDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog({
            modal: true,
            closeOnEscape: false,
            dialogClass: "no-close",
            buttons: [{
                text: "OK",
                click: function() { $(this).dialog("close"); }
            }]
        });
}////////////////////////////////////// SEND PLAYER TO JAIL //
function playerDraw(card) {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    switch (card) {
        case 0:
            var aoCards = aoChestCards;
            var sCard = "Community Chest";
            var nCard = aChestCards.shift();
            var eModalDialog = $('#modalChestDialog');
            if (nCard != 1) { aChestCards.push(nCard); }
            aoPlayers[nPlayer].chest = "no"
        break;
        case 1:
            var aoCards = aoChanceCards;
            var sCard = "Chance";
            var nCard = aChanceCards.shift();
            var eModalDialog = $('#modalChanceDialog');
            if (nCard != 1) { aChanceCards.push(nCard); }
            aoPlayers[nPlayer].chance = "no"
        break;
    }// switch between chance or community chest card //
    eModalDialog.empty()
        .append('<p>You can draw a ' + sCard + ' card!</p>')
        .dialog({
            modal: true,
            closeOnEscape: false,
            dialogClass: "no-close",
            buttons: [{
                text: "Draw Card",
                click: function() {
                    showDialog(aoCards[nCard].description, card);
                    if (aoCards[nCard].credits > 0) {
                        aoPlayers[nPlayer].credits += aoCards[nCard].credits;
                        showPlayerInfo();
                    } // card says collect credits //
                    if (aoCards[nCard].credits < 0) {
                        aoPlayers[nPlayer].debt[6] = Math.abs(aoCards[nCard].credits);
                        playerTurn();
                    }// card says pay credits //
                    if (aoCards[nCard].location >= 0) {
                        if (aoCards[nCard].location > nLocation) {
                            aoPlayers[nPlayer].to = aoCards[nCard].location;
                            playerMove();
                        }// location is further along //
                        if (aoCards[nCard].location < nLocation) {
                            aoPlayers[nPlayer].to = aoCards[nCard].location;
                            playerMove();
                        }// location is back a way //
                    }// card says relocate forwards //
                    if (aoCards[nCard].location < 0) {
                        aoPlayers[nPlayer].location += aoCards[nCard].location;
                        showAll(aoPlayers[nPlayer].location, nPlayer);
                        showAvatars();
                        playerTurn();
                    }// card says relocate backwards //
                    if (aoCards[nCard].house > 0) {
                        var nHouses = 0;
                        var nHotels = 0;
                        var nTotal = 0;
                        for (var i = 0; i < aoTiles.length; i++) {
                            if (aoTiles[i].owner == nPlayer) {
                                if (aoTiles[i].assets == 5) { nHotels += 1; }
                                if (aoTiles[i].assets < 5) { nHouses += aoTiles[i].assets; }
                            }
                        }
                        nTotal = nHouses * aoCards[nCard].house + nHotels * aoCards[nCard].hotel;
                        if (nTotal > 0) {
                            aoPlayers[nPlayer].debt[6] = nTotal;
                            playerTurn();
                        }
                    }// card says pay credits for houses/hotels //
                    if (aoCards[nCard].players < 0) {
                        for (var i = 0; i < 6; i++) {
                            if (i != nPlayer && aPlayers.indexOf(i) != -1) {
                                aoPlayers[nPlayer].debt[i] = Math.abs(aoCards[nCard].players);
                            }
                        }
                        playerTurn();
                    }// card says pay credits to all players //
                    if (aoCards[nCard].players > 0) {
                        for (var i = 0; i < aPlayers.length; i++) {
                            if (i != nPlayer) {
                                if (aoPlayers[aPlayers[i]].credits >= aoCards[nCard].players) {
                                    aoPlayers[aPlayers[i]].credits -= aoCards[nCard].players;
                                }
                                else {
                                    aoPlayers[aPlayers[i]].priority = aoCards[nCard].players - aoPlayers[aPlayers[i]].credits;
                                    aoPlayers[aPlayers[i]].credits = 0;
                                }
                            }
                        }
                        aoPlayers[nPlayer].credits += (aoCards[nCard].players * (aPlayers.length - 1));
                        showPlayerInfo();
                        playerTurn();
                    }// card says receive credits from all players //
                    if (nCard == 0) {
                        playerJail('You have been sent to Jail!');
                        showAvatars();
                        showAll(aoPlayers[nPlayer].location, nPlayer);
                        playerTurn();
                    }// Go to Jail //
                    if (nCard == 1) {
                        aoPlayers[nPlayer].cards[card] = 1;
                        showPlayerOwned(nPlayer, $('#center'));
                    }// Get out of Jail for free //
                    if (aoCards[nCard].redirect == "train") {
                        aoPlayers[nPlayer].redirect = "yes";
                        aoPlayers[nPlayer].to = (Math.round(nLocation / 10) * 10 + 5) % 40;
                        playerMove();
                    }// card says advance to nearest railroad //
                    if (aoCards[nCard].redirect == "utility") {
                        aoPlayers[nPlayer].redirect = "yes";
                        if (nLocation < 12 || nLocation > 28) { aoPlayers[nPlayer].to = 12; }
                        else { aoPlayers[nPlayer].to = 28; }
                        playerMove();
                    }// card says advance to nearest utility //
                    $(this).dialog("close");
                }
            }]
        });
}///////////////////////////////////// DRAW A CARD //
function playerNext() {
//    console.log("playerNext");
    playerSet();
    aoPlayers[aPlayers[0]].start = "yes";
    aPlayers.push(aPlayers.shift());
    
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var ePlayers = $('#players');
    var ePlayersHead = $('<div id="playersHead" class="menuPlayersHead"><h3>It\'s ' + aoPlayers[aPlayers[0]].name + '\'s turn</h3></div>');  
    ePlayers.empty().append(ePlayersHead);
    
    for (var i = 0; i < aPlayers.length; i++) {        
        var eStats = $('<div id="stats' + aPlayers[i] + '" class="menuPlayerStats"></div>');
        ePlayers.append(eStats);
    }// go over players //
    $("div[id^='stats']").click(function() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showAll(aoPlayers[nId].location, nId);
        showPlayerOwned(nId, $('#center'));
    })// player event listener //
    
    showDialog('It\'s ' + aoPlayers[nPlayer].name + '\'s turn!', 'turn');
    showAll(nLocation, nPlayer);
    playerTurn();
}////////////////////////////////////////// NEXT PLAYER //
function playerBankrupt() {
    var eModalDialog = $('#modalBankruptDialog');

    eModalDialog.empty()
        .append('<p>Your have to pay more than your total wealth!</p>')
        .dialog({
            modal: true,
            closeOnEscape: false,
            dialogClass: "no-close",
            buttons: [{
                text: "Quit Game",
                click: function() {
                    playerEnd();
                    $(this).dialog("close");
                }
            }]
        });
}

function showAll(id, player) {
//    console.log("showAll");
    showTileInfo(id);
    showTileAssets();
    showTileSelected(id);
    showPlayerInfo();
    showBank();
    showPlayerOwned(player, $('#center'))
    showPlayerAssets(player);
    showPlayerSelected(player);
}/////////////////////////////////// SHOW ALL INFO //
function showMovement() {
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    if (nLocation == 39) {
        aoPlayers[nPlayer].location = 0;
        aoPlayers[nPlayer].credits += 200;
        showDialog('Collected 200', 'go');
    }// passing GO //
    else { aoPlayers[nPlayer].location += 1; }
    
    showTileSelected(aoPlayers[nPlayer].location);
    showAvatars();
    playerMove();
}//////////////////////////////////////// SHOW PLAYER MOVEMENT //
function showBank() {
    var eMenu = $('#menu');
    var eBank = $('#bank');
    eBank.remove();
    eBank = $('<div id="bank" class="bank"><span><p>Bank:</p></span><span><span class="asset hotel"></span><span><p>x' + aoTiles[0].bank[0] + '</p></span></span><span><span class="asset house"></span><span><p>x' + aoTiles[0].bank[1] + '</p></span></span>');

    eMenu.append(eBank);
}
function showTileInfo(id) {
//    console.log(" -showTileInfo");
    $('.infoGreen').removeClass("infoGreen");
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var sMonopoly = checkMonopoly(id);
    var sBuy = checkBuy();
    
    var eInfo = $('#info' + sTradeMode);
    var eInfoHead = $('<div id="infoHead" class="infoHead ' + getString(aoTiles[id].color) + '"></div>');
    var sTitle = $('<h3>' + aoTiles[id].title + '</h3>');
    var eInfoBody = $('<div id="infoBody" class="infoBody"></div>');
    var eInfoFoot = $('<div id="infoFoot" class="infoFoot"></div>');

    eInfo.empty().append(eInfoHead);
    eInfoHead.append(sTitle);
    
    if (!isNaN(aoTiles[id].owner)) {
        var sOwner = $('<p><span>Owner:</span><span>' + aoPlayers[aoTiles[id].owner].name + '</span></p>');
        eInfoBody.append(sOwner);

        if (aoTiles[id].owner == nPlayer) {
            if (aoTiles[id].mortgage == "yes") {/////////////////////////////// if property is mortgaged //
                var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Pay ' + parseInt(aoTiles[id].price / 2 * 1.1) + ' mortgage</button>');
                eInfoFoot.append(eMortgage);
                eMortgage.click(function() {
                    payMortgage(id);
                });
                var eSell = $('<button type="button" id="sell" class="actionButton">Sell for ' + aoTiles[id].price / 2 + '</button>');
                eInfoFoot.append(eSell);
                eSell.click(function() {
                    sellProperty(id);
                });
            }// if tile is mortgaged //
            else {
                if (sMonopoly == "yes") {
                    if (isNaN(aoTiles[id].assets) || aoTiles[id].assets < 5) {
                        if (aoTiles[id].assets == 4) { var sAsset = "Hotel"; }
                        else { var sAsset = "House"; }
                        var eBuild = $('<button type="button" id="build" class="actionButton">Buy ' + sAsset + ' for ' + aoTiles[id].cost + '</button>');
                        eInfoFoot.append(eBuild);
                        eBuild.click(function() {
                            getAsset(id);
                        });
                    }// can buy assets //
                }// allowed to buy assets //
                if (aoTiles[id].assets > 0) {
                    if (aoTiles[id].assets == 5) { var sAsset = "Hotel"; }
                    else { var sAsset = "House"; }
                    var eSell = $('<button type="button" id="sell" class="actionButton">Sell ' + sAsset + ' for ' + parseInt(aoTiles[id].cost / 2) + '</button>');
                    eInfoFoot.append(eSell);
                    eSell.click(function() {
                        sellAsset(id);
                    });
                }// can sell assets //
                else {
                    if (checkAssets(id) == 0) {
                        var eMortgage = $('<button type="button" id="mortgage" class="actionButton">Mortgage for ' + parseInt(aoTiles[id].price / 2) + '</button>');
                        eInfoFoot.append(eMortgage);
                        eMortgage.click(function() {
                            getMortgage(id);
                        });
                    }// allow to mortgage if no assets in monopoly //
                }// if tile has no assets //
            }// if tile is not mortgaged //
        }// if tile is owned by current player //
    }// if property is owned //
    if (aoTiles[id].description) {
        var sDescription = $('<p>' + aoTiles[id].description + '</p>');
        eInfoBody.append(sDescription);
    }// show description if there is one //
    if (id == 10) {
        for (var i = 0; i < aPlayers.length; i++) {
            if (aoPlayers[aPlayers[i]].jail > 0) {
                var sInmate = $('<p>' + aoPlayers[aPlayers[i]].name + ' is in jail.</p>');
                eInfoBody.append(sInmate);
            }
        }
    }// show jail population //
    if (aoTiles[id].price > 0) {
        if (aoTiles[id].mortgage == "yes") { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>Yes</span></p>'); }
        else { var eHasMortgage = $('<p id="stat0"><span>Mortgaged:</span><span>No</span></p>'); }
        eInfoBody.append(eHasMortgage);
        var sPrice = $('<p><span>Price:</span><span>' + aoTiles[id].price + '</span></p>');
        var sMortgage = $('<p><span>Mortgage:</span><span>' + aoTiles[id].price / 2 + '</span></p>');            
        eInfoBody.append(sPrice)
            .append(sMortgage);
    }// if tile is ownable //
    if (aoTiles[id].type == "street") {
        var sCost = $('<p><span>Build cost:</span><span>' + aoTiles[id].cost + '</span></p>');
        var sRent = $('<p id="stat1"><span>Base Rent:</span><span>' + aoTiles[id].rent[0] + '</span></p>');
        var sRentM = $('<p id="stat2"><span>=> Monopoly:</span><span>' + aoTiles[id].rent[0] * 2 + '</span></p>');
        var sRentH1 = $('<p id="stat3"><span>=> 1 House:</span><span>' + aoTiles[id].rent[1] + '</span></p>');
        var sRentH2 = $('<p id="stat4"><span>=> 2 Houses:</span><span>' + aoTiles[id].rent[2] + '</span></p>');
        var sRentH3 = $('<p id="stat5"><span>=> 3 Houses:</span><span>' + aoTiles[id].rent[3] + '</span></p>');
        var sRentH4 = $('<p id="stat6"><span>=> 4 Houses:</span><span>' + aoTiles[id].rent[4] + '</span></p>');
        var sRentHotel = $('<p id="stat7"><span>=> 1 Hotel:</span><span>' + aoTiles[id].rent[5] + '</span></p>');
        eInfoBody.append(sCost)
            .append(sRent)
            .append(sRentM)
            .append(sRentH1)
            .append(sRentH2)
            .append(sRentH3)
            .append(sRentH4)
            .append(sRentHotel);
    }// show street stats //
    if (aoTiles[id].type == "train") {
        var sCostR1 = $('<p id="stat1"><span>=> 1 Railroad:</span><span>' + aoTiles[0].trains[0] + '</span></p>');
        var sCostR2 = $('<p id="stat2"><span>=> 2 Railroads:</span><span>' + aoTiles[0].trains[1] + '</span></p>');
        var sCostR3 = $('<p id="stat3"><span>=> 3 Railroads:</span><span>' + aoTiles[0].trains[2] + '</span></p>');
        var sCostR4 = $('<p id="stat4"><span>=> 4 Railroads:</span><span>' + aoTiles[0].trains[3] + '</span></p>');
        eInfoBody.append(sCostR1)
            .append(sCostR2)
            .append(sCostR3)
            .append(sCostR4);
    }// show railroad stats //
    if (aoTiles[id].type == "utility") {
        var sCostU1 = $('<p id="stat1"><span>=> 1 Utility:</span><span>' + aoTiles[0].utilities[0] + 'x Roll</span></p>');
        var sCostU2 = $('<p id="stat2"><span>=> 2 Utilities:</span><span>' + aoTiles[0].utilities[1] + 'x Roll</span></p>');
        eInfoBody.append(sCostU1)
            .append(sCostU2);
    }// show utility stats //
    if (id == nLocation) {
        if (sBuy == "yes" && aoTiles[id].price >= 0) {
            var eBuy = $('<button type="button" id="buy" class="actionButton">Buy for ' + aoTiles[id].price + '</button>');
            eInfoFoot.append(eBuy);
            eBuy.click(function() {
                getProperty();
            });
        }// if player can buy //
        if (aoPlayers[nPlayer].jail > 0 && id == 10) {
            if (aoPlayers[nPlayer].start == "yes") {
                var eFine = $('<button type="button" id="fine" class="actionButton">Pay ' + aoTiles[id].fine + '</button>');
                eInfoFoot.append(eFine);
                eFine.click(function() {
                    aoPlayers[nPlayer].to = 10;
                    payFine();
                });
            }// if at start of player turn
            if (aoPlayers[nPlayer].cards[0] > 0 || aoPlayers[nPlayer].cards[1] > 0) {
                var eCard = $('<button type="button" id="fine" class="actionButton">Use Card</button>');
                eInfoFoot.append(eCard);
                eCard.click(function() {
                    if (aoPlayers[nPlayer].cards[0] > 0 && aoPlayers[nPlayer].cards[1] > 0) {
                        aoPlayers[nPlayer].cards[0] = 0;
                        aChestCards.push(0);
                    }// if player has both cards
                    else {
                        if (aoPlayers[nPlayer].cards[0] > 0) {
                            aoPlayers[nPlayer].cards[0] = 0;
                            aChestCards.push(0);
                        }// if player has chest card //
                        if (aoPlayers[nPlayer].cards[1] > 0) {
                            aoPlayers[nPlayer].cards[1] = 0;
                            aChanceCards.push(0);
                        }// if player has chance card
                    }// if player has one card
                    aoPlayers[nPlayer].jail = 0;
                    showTileInfo(id);
                    showPlayerOwned(nPlayer, $('#center'));
                    playerTurn();
                });
            }// if player can use card
        }// if this is jail //
    }// if player is here //
    if (eInfoBody.is(':parent')) { eInfo.append(eInfoBody); }
    if (eInfoFoot.is(':parent') && sTradeMode != "Trade") { eInfo.append(eInfoFoot); }
    if (id == nLocation && sBuy == "yes") { showDialog('You can buy ' + aoTiles[id].title + '!', 'buy'); }
    if (!isNaN(aoTiles[id].owner)) {
        if (aoTiles[id].mortgage == "yes") { $('#stat0').addClass("infoGreen"); }// highlight mortgaged if property has mortgage //
        else {
            if (aoTiles[id].assets > 0) { $('#stat' + parseInt(aoTiles[id].assets + 2)).addClass("infoGreen"); }// highlight rent due to assets //
            else {
                if (aoTiles[id].type == "street") {
                    if (sMonopoly != "yes" && sMonopoly != "but") { $('#stat1').addClass("infoGreen"); }// highlight base rent if no monopoly //
                    if (sMonopoly == "yes" || sMonopoly == "but") { $('#stat2').addClass("infoGreen"); }// highlight monopoly rent //
                }
                if (aoTiles[id].type == "train" || aoTiles[id].type == "utility") { $('#stat' + sMonopoly).addClass("infoGreen"); }// highlight rent due to number of railroads or utilities //
            }
        }
    }// highlight rents if property is owned //
}///////////////////////////////////// SHOW TILE INFO //
function showTileAssets() {
//    console.log(" -showTileAssets");
    $('.asset').remove();
    for (var i = 0; i < aoTiles.length; i++) {
        $('#tile' + i).removeClass("asset1").removeClass("asset2").removeClass("asset3").removeClass("asset4").removeClass("asset5");
      
        if (aoTiles[i].assets > 0) {
            if (aoTiles[i].assets == 5) {
                var eHotel = $('<div class="asset hotel"></div>');
                $('#assetBox' + i).append(eHotel);
            }// if hotel //
            else {
                for (var n = 0; n < aoTiles[i].assets; n++) {
                    var eHouse = $('<div class="asset house"></div>');
                    $('#assetBox' + i).append(eHouse);
                }// show each house //
            }// if houses //
        }// if tile has assets //
    }// go over tiles //
}////////////////////////////////////// SHOW HOTELS/HOUSES ON TILES //
function showTileSelected(id) {
//    console.log(" -showTileSelected");
    $('.tileHighLight').removeClass("tileHighLight");
    $('#tile' + id).addClass('tileHighLight');
}/////////////////////////////////// SHOW SELECTED TILE //
function showPlayerInfo() {
//    console.log(" -showPlayerInfo");
    for (var i = 0; i < aPlayers.length; i++) {
        var sName = aoPlayers[aPlayers[i]].name;
        var nLocation = aoPlayers[aPlayers[i]].location % 40;
        var nCredits = aoPlayers[aPlayers[i]].credits;
        var nWealth = checkWealth(aPlayers[i]);
        var sAvatar = aoPlayers[aPlayers[i]].avatar;
        
        var eStats = $('#stats' + aPlayers[i]);
        var eName = $('<p>' + sName + '</p>');
        var eLocation = $('<p>' + aoTiles[nLocation].title + '</p>');
        var eCredits = $('<p>' + nCredits + '</p>');

        eStats.empty()
            .addClass(sAvatar)
            .addClass('avatarBig')
            .append(eName)
            .append(eLocation)
            .append(eCredits);
    }// go over players //
}////////////////////////////////////// SHOW PLAYER INFO //
function showPlayerOwned(player, element) {
//    $('.properties').remove();
    element.find("div[id^='property']").remove();
    element.find('.properties').remove();
    var aOwned = [[], [], [], [], [], [], [], [], [], []];
    var eMonopolies = $('<div class="properties"></div>');
    element.append(eMonopolies);
    
    for (var i = 0; i < aoTiles.length; i++) { if (aoTiles[i].owner == player) { aOwned[aoTiles[i].groupid].push(i); } }// divide properties by groupid //
    for (var i = 0; i < aOwned.length; i++) {
        if (aOwned[i].length > 0) {
            if (!(sTradeMode == "Trade" && checkAssets(aOwned[i][0]) > 0)) {
                var ePropertyBox = $('<div class="propertyBox"></div>');
                eMonopolies.append(ePropertyBox);
                for (var j = 0; j < aOwned[i].length; j++) {
                    if (sTradeMode != "Trade" || checkAssets(aOwned[i][j]) == 0) {
                        if (sTradeMode == "Trade") { var nCost = aoTiles[aOwned[i][j]].price; }// if in trade mode show property price //
                        else {
                            if (aoTiles[aOwned[i][j]].type == "utility") { var nCost = checkRent(aOwned[i][j]) + 'x'; }// if utility //
                            else { var nCost = checkRent(aOwned[i][j]); }// if not utility //
                        }// if not in trade mode show rent //
                        var eProperty = $('<div id="property' + aOwned[i][j] + '" class="property"></div>');
                        var ePropertyHead = $('<div class="propertyHead"></div>');
                        var ePropertyBody = $('<div class="propertyBody"><p>' + nCost + '</p></div>');
                        var eAssetBox = $('<div class="propertyAssets"></div>');

                        if (aoTiles[aOwned[i][j]].type == "street") { ePropertyHead.addClass(aoTiles[aOwned[i][j]].color); }// if street tile //
                        if (aoTiles[aOwned[i][j]].type == "train") { ePropertyBody.addClass(aoTiles[aOwned[i][j]].type + 'Mini'); }// if railroad tile //
                        if (aoTiles[aOwned[i][j]].type == "utility") { ePropertyBody.addClass(aoTiles[aOwned[i][j]].utility + 'Mini'); }// if utility tile //
                        if (aoTiles[aOwned[i][j]].assets == 5) {
                            var eAsset = $('<div class="assetMini hotel"></div>');
                            eAssetBox.append(eAsset);
                        }// if hotel on tile //
                        else {
                            for (var k = 0; k < aoTiles[aOwned[i][j]].assets; k++) {
                                var eAsset = $('<div class="assetMini house"></div>');
                                eAssetBox.append(eAsset);
                            }// show houses if there are any //
                        }// if either houses or nothing //
                        ePropertyBox.append(eProperty);
                        eProperty.append(ePropertyHead)
                                .append(ePropertyBody);
                        ePropertyHead.append(eAssetBox);
                    }
                }// go over properties in group //
            }// NOT both in trade mode and has assets in monopoly //
        }// if player has properties in group //
    }// go over owned properties array //
    if (aoPlayers[player].cards[0] == 1 || aoPlayers[player].cards[1] == 1) {
        var eCardBox = $('<div class="propertyBox"></div>');
        eMonopolies.append(eCardBox);
        for (var n = 0; n < aoPlayers[player].cards.length; n++) {
            if (aoPlayers[player].cards[n] == 1) {
                switch (n) {
                    case 0: var sCard = "chest"; break;
                    case 1: var sCard = "chance"; break;
                }
                var eCard = $('<div id="card' + n + '" class="card ' + sCard + '"></div>');
                eCardBox.append(eCard);
            }
        }
    }// if player has cards to trade //
    if (sTradeMode != "Trade") {
        var nMarginTop = aPlayers.indexOf(parseInt(player)) * 70 + 240 - ($('.propertyBox').length * 54) / 2;
        var nMarginBottom = nMarginTop + $('.propertyBox').length * 56;
        if (nMarginBottom > 734) { nMarginTop = parseInt(734 - $('.propertyBox').length * 56); }
        if (nMarginTop < 2) { nMarginTop = 2; }
        eMonopolies.css('margin-top', nMarginTop + 'px');
    }// if not in trade mode //
    
    element.find("div[id^='property']").click(function showProperty() {
        var nId = parseInt(this.id.match(/\d+/)[0]);
        showTileInfo(nId);
        showTileSelected(nId);
        if (sTradeMode == "Trade") {
            if (element.find('#property' + nId).hasClass('propertyHighLight')) { element.find('#property' + nId).removeClass('propertyHighLight'); }// unhighlight it //
            else { element.find('#property' + nId).addClass('propertyHighLight'); }// highlight it //
        }// if in trade mode //
    });// property event listener //
    element.find("div[id^='card']").click(function showCard() {
        var nId = parseInt(this.id.match(/\d+/)[0]);        
        showDialog('Get out of Jail free!', nId);
        if (sTradeMode == "Trade") {
            if (element.find('#card' + nId).hasClass('propertyHighLight')) { element.find('#card' + nId).removeClass('propertyHighLight'); }// unhighlight it //
            else { element.find('#card' + nId).addClass('propertyHighLight'); }// highlight it //
        }// if in trade mode //
    });// card event listener //
}////////////////////// SHOW PLAYER OWNED/RENTS IN MENU //
function showPlayerAssets(player) {
//    console.log(" -showPlayerAssets");
    for (var i = 0; i < aoTiles.length; i++) {
        $('#tile' + i).removeClass("greenLed").removeClass("yellowLed").removeClass("redLed").removeClass("blueLed");
        
        if (!isNaN(aoTiles[i].owner)) {// if tile has owner
            if (aoTiles[i].owner == player) {// if owner is player
                if (aoTiles[i].mortgage == "yes") {
                    $('#tile' + i).addClass("yellowLed");// tile is mortgaged
                }// mortgaged //
                else if (checkMonopoly(i) == "yes") {
                    $('#tile' + i).addClass("blueLed");// player can build on tile
                }// in monopoly //
                else {
                    $('#tile' + i).addClass("greenLed");// player owns tile
                }// neigher mortgaged nor in monopoly //
            }// owner is player //
            if (aoTiles[i].owner != player) { $('#tile' + i).addClass("redLed"); }// owner is other player
        }// if tile has owner //
    }// go over tiles //
}////////////////////////////// SHOW PLAYER OWNED/MORTGAGED/MONOPOLY ON MAP //
function showPlayerSelected(player) {
//    console.log(" -showPlayerSelected");
    var eStats = $('#stats' + player);
    $('.playerHighLight').removeClass("playerHighLight");
    eStats.addClass("playerHighLight");
}///////////////////////////// SHOW SELECTED PLAYER //
function showTraderSelected(player, side) {
    var eAvatarBox = $('#tradeAvatarBox' + side);
    eAvatarBox.find('.traderHighLight').removeClass('traderHighLight');
    $('#avatar' + side + player).addClass('traderHighLight');
}
function showAvatars() {
//    console.log(" -showAvatars");
    for (var i = 0; i < aPlayers.length; i++) {
        $('#player' + aPlayers[i]).remove();
        var nLocation = aoPlayers[aPlayers[i]].location % 40;

        var eAvatarBox = $('#avatarBox' + nLocation);
        var sAvatar = aoPlayers[aPlayers[i]].avatar;
        var eAvatar = $('<div id="player' + aPlayers[i] + '" class="avatar ' + sAvatar + '"></div>');
        eAvatarBox.append(eAvatar);
    }// go over players //
}///////////////////////////////////////// SHOW AVATARS //
function showDialog(text, type) {
    switch (type) {
        case 0: 
            var eDialog = $('#chestCardDialog'); 
            var sMy = "left top";
            var sAt = "left top";
            var eOf = $('#infoHead');
        break;
        case 1: 
            var eDialog = $('#chanceCardDialog'); 
            var sMy = "left top";
            var sAt = "left top";
            var eOf = $('#infoHead');
        break;
        case "turn": 
            var eDialog = $('#turnDialog'); 
            var sMy = "right top";
            var sAt = "left bottom";
            var eOf = $('#trade');
        break;
        case "dice":
            var eDialog = $('#diceDialog');
            var sMy = "left top";
            var sAt = "left bottom";
            var eOf = $('#dice');
        break;
        case "go": 
            var eDialog = $('#goDialog'); 
            var sMy = "right top";
            var sAt = "left top";
            var eOf = $('#tile0');
        break;
        case "warning": 
            var eDialog = $('#warningDialog'); 
            var sMy = "left top";
            var sAt = "right top";
            var eOf = $('#action');
        break;
        case "buy": 
            var eDialog = $('#buyDialog'); 
            var sMy = "left top";
            var sAt = "right top";
            var eOf = $('#buy');
        break;
        case "monopoly": 
            var eDialog = $('#monopolyDialog'); 
            var sMy = "left bottom";
            var sAt = "left top";
            var eOf = $('#infoFoot');
        break;
        case "jail": 
            var eDialog = $('#jailDialog'); 
            var sMy = "left top";
            var sAt = "right top";
            var eOf = $('#tile10');
        break;
    }// switch location of window according to dialog type //
    eDialog.empty()
        .append('<p>' + text + '</p>')
        .dialog({ position: { my: sMy, at: sAt, of: eOf }});
    setTimeout(function(){ eDialog.dialog('close'); }, 2000);
}//////////////////////////////// SHOW DIALOG POPUP //

function checkWealth(player) {
//    console.log(" ---checkWealth");
    var nWealth = aoPlayers[player].credits;
    for (var i = 0; i < aoTiles.length; i++) {
        if (aoTiles[i].owner == player) {
            nWealth += checkValue(i);
        }// if tile is owned by player //
    }// go over tiles //
    return nWealth;
}/////////////////////////////////// CHECK TOTAL WEALTH OF PLAYER //
function checkValue(id) {
    var nValue = 0;
    if (aoTiles[id].mortgage == "yes") {
        nValue += aoTiles[id].price / 2;
    }// tile is mortgaged //
    else {
        nValue += aoTiles[id].price;
    }// not mortgaged //
    if (aoTiles[id].assets > 0) {
        nValue += aoTiles[id].assets * (aoTiles[id].cost / 2);
    }// tile has buildings //
    return nValue;
}//////////////////////////////////////// CHECK TOTAL VALUE OF TILE //
function checkAssets(id) {
//    console.log("   -checkAssets");
    var nAssets = 0;
    var sColor = aoTiles[id].color;
    for (var i = 0; i < aoTiles.length; i++) {
        if (aoTiles[i].color == sColor && !isNaN(aoTiles[i].assets)) {  nAssets += aoTiles[i].assets; }
    }
    return nAssets;
}//////////////////////////////////////// CHECK NUMBER OF ASSETS IN MONOPOLY //
function checkProperties(id) {
//    console.log(" -checkProperties");
    var nMonopolyHas = 0;
    var sColor = aoTiles[id].color;
    for (var i = 0; i < aoTiles.length; i++) {
        if (sColor == aoTiles[i].color) {
            nMonopolyHas += 1;
        }
    }
    return nMonopolyHas;
}/////////////////////////////////// CHECK NUMBER OF PROPERTIES IN MONOPOLY //
function checkPlayerDebt() {
//    console.log("   -checkPlayerDebt");
    var nPlayer = aPlayers[0];
    var nPlayerDebt = 0;
    for (var i = 0; i < 6; i++) {
        nPlayerDebt += aoPlayers[nPlayer].debt[i];
    }
    return nPlayerDebt;
}////////////////////////////////////// CHECK IF PLAYER HAS DEBT TO OTHER PLAYERS //
function checkBankDebt() {
    var nPlayer = aPlayers[0];
    var nPriority = aoPlayers[nPlayer].priority;
    var nBankDebt = aoPlayers[nPlayer].debt[6];
    return nPriority + nBankDebt;
}//////////////////////////////////////// CHECK IF PLAYER HAS DEBT TO BANK //
function checkBuy() {
//    console.log("   -checkBuy");
    var nPlayer = aPlayers[0];
    var sBuy = aoPlayers[nPlayer].buy;
    var nLocation = aoPlayers[nPlayer].location;
    if (isNaN(aoTiles[nLocation].owner) && aoTiles[nLocation].price > 0 && sBuy == "yes") {
        return "yes";
    }
}///////////////////////////////////////////// CHECK IF PLAYER CAN BUY //
function checkMonopoly(id) {
//    console.log("   -checkMonopoly");
    var nPlayerHas = 0;
    var nMonopolyHas = 0;
    var nMortgages = 0;
    var sOwner = aoTiles[id].owner;
    var sType = aoTiles[id].type;
    var sColor = aoTiles[id].color;

    if (sType == "street") {
        for (var i = 0; i < aoTiles.length; i++) {
            if (aoTiles[i].color == sColor) {
                nMonopolyHas += 1;//number of tiles in monopoly of that color
                if (aoTiles[i].owner == sOwner) { nPlayerHas += 1; }//number of tiles of that color owner has
                if (aoTiles[i].mortgage == "yes") { nMortgages += 1; }//number of tiles of that color owner has
            }
        }// go over tiles of a certain color //
        if (nMonopolyHas == nPlayerHas) {
            if (nMortgages == 0) { return "yes"; }
            else { return "but"; }
        }// player has all tiles in monopoly //
    }// if street tile //
    if (aoTiles[id].type == "train" || aoTiles[id].type == "utility") {
        var sType = aoTiles[id].type;
        for (var i = 0; i < aoTiles.length; i++) {
            if (aoTiles[i].type == sType) {
                if (aoTiles[i].owner == sOwner) { nPlayerHas += 1; }//number of tiles of that color owner has
            }
        }
        return nPlayerHas;
    }
}///////////////////////////////////// CHECK IF PLAYER HAS MONOPOLY ON TILE //
function checkRent(id) {
    var sMortgage = aoTiles[id].mortgage;
    var sType = aoTiles[id].type;
    var nAssets = aoTiles[id].assets;
    var sMonopoly = checkMonopoly(id);
    
    if (sMortgage != "yes") {
        if (sType == "street") {
            if (!isNaN(nAssets)) {  return aoTiles[id].rent[nAssets]; }// rent if owner has assets
            else {
                if (sMonopoly == "yes" || sMonopoly == "but") { return aoTiles[id].rent[0] * 2; }// rent if owner has monopoly
                else { return aoTiles[id].rent[0]; }// rent if owner has no monopoly
            }// rent if owner has no assets
        }// rent
        if (sType == "train") { return aoTiles[0].trains[sMonopoly - 1]; }// fee from railroads
        if (sType == "utility") { return aoTiles[0].utilities[sMonopoly - 1]; }// fee from utilities
    }// if not mortgaged
    else { return 0; }
}///////////////////////////////////////// CHECK RENT ON THIS TILE //

function getProperty() {
//    console.log("getProperty");
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    if (aoPlayers[nPlayer].credits >= aoTiles[nLocation].price) {
        aoTiles[nLocation].owner = nPlayer;
        aoPlayers[nPlayer].credits -= aoTiles[nLocation].price;
        if (checkMonopoly(nLocation) == "yes" || checkMonopoly(nLocation) == "but") { showDialog('You have acquired a monopoly', 'monopoly'); }// if this tile completes monopoly //
        showAll(nLocation, nPlayer);
    }// player has enough credits //
    else {
        showDialog('Not enough credits!', 'warning');
    }
}///////////////////////////////////////// BUY PROPERTY //
function getMortgage(id) {
//    console.log("getMortgage");
    var nPlayer = aPlayers[0];
    aoTiles[id].mortgage = "yes";
    aoPlayers[nPlayer].credits += (aoTiles[id].price / 2);
    showAll(id, nPlayer);
}//////////////////////////////////////// MORTGAGE PROPERTY //
function getAsset(id) {
//    console.log("getAsset");
    var nPlayer = aPlayers[0];
    var bought = "no";
    if (aoPlayers[nPlayer].credits >= aoTiles[id].cost) {
        if (!((aoTiles[id].assets == 4 && aoTiles[0].bank[0] == 0) || ((aoTiles[id].assets < 4 || isNaN(aoTiles[id].assets)) && aoTiles[0].bank[1] == 0))) {
            if (isNaN(aoTiles[id].assets)) {
                aoTiles[id].assets = 1;
                aoTiles[0].bank[1] -= 1;
                bought = "yes";
            }// first asset //
            else {
                if (checkAssets(id) >= (checkProperties(id) * aoTiles[id].assets)) {
                    aoTiles[id].assets = aoTiles[id].assets + 1;
                    if (aoTiles[id].assets == 5) {
                        aoTiles[0].bank[0] -= 1;
                        aoTiles[0].bank[1] += 4;
                    }
                    else { aoTiles[0].bank[1] -= 1; }
                    bought = "yes";
                }
                else { showDialog('Your assets have to be spread out more evenly accross your monopoly!', 'warning'); }
            }// checking if assets are spread out enough //
            if (bought == "yes") {
                aoPlayers[nPlayer].credits -= aoTiles[id].cost;
                showAll(id, nPlayer);
            }// player was able to buy asset //
        }
        else { showDialog('The bank has no more to sell!', 'warning'); }
    }// player has enough credits to buy house/hotel
    else { showDialog('Not enough credits!', 'warning'); }
}////////////////////////////////////////// BUY AN ASSET //

function setDebt() {
//    console.log("   -setDebt");
    var nFactor = 1;
    var nPlayer = aPlayers[0];
    var nLocation = aoPlayers[nPlayer].location;
    var nDice = aoPlayers[nPlayer].dice;
    var sRedirect = aoPlayers[nPlayer].redirect;
    var nOwner = aoTiles[nLocation].owner;
    var nPrice = aoTiles[nLocation].price;
    var sType = aoTiles[nLocation].type;
    var sRent = checkRent(nLocation);
    
    if (sRedirect == "yes") {
        aoPlayers[nPlayer].redirect = "no";
        nFactor = 2;
    }// redirected by card
    if (!isNaN(nOwner) && nOwner != nPlayer) {
        if (sType == "street") {  aoPlayers[nPlayer].debt[nOwner] = sRent; }
        if (sType == "train") { aoPlayers[nPlayer].debt[nOwner] = sRent * nFactor; }
        if (sType == "utility") { aoPlayers[nPlayer].debt[nOwner] = sRent * nDice * nFactor; }
    }// rent
    if (nPrice < 0) { aoPlayers[nPlayer].debt[6] = Math.abs(parseInt(nPrice)); }// taxes
}///////////////////////////////////////////// SET DEBT IF PLAYER HAS TO PAY //

function payDebt(amount) {
//    console.log("payDebt");
    var nPlayer = aPlayers[0];
    
    if (aoPlayers[nPlayer].credits >= amount) {
        for (var i = 0; i < 6; i++) {
            aoPlayers[i].credits += aoPlayers[nPlayer].debt[i];
        }// resolve debt to other players //
        aoPlayers[nPlayer].credits -= amount;
        aoPlayers[nPlayer].pay = "no";
        aoPlayers[nPlayer].priority = 0;
        aoPlayers[nPlayer].debt = [0, 0, 0, 0, 0, 0, 0];

        showPlayerInfo();
        playerTurn();
    }// player can cover debt //
    else {
        showDialog('Not enough credits!', 'warning');
    }
}/////////////////////////////////////// PAY OFF DEBTS //
function payFine() {
//    console.log("payDebt");
    var nPlayer = aPlayers[0];
    
    if (aoPlayers[nPlayer].credits >= aoTiles[10].fine) {
        aoPlayers[nPlayer].credits -= aoTiles[10].fine;
        aoPlayers[nPlayer].jail = 0;
        playerReset();
        showPlayerInfo();
        playerMove();
    }// player has enough credits to pay fine //
    else {
        showDialog('Not enough credits!', 'warning');
    }
}///////////////////////////////////////////// PAY FINE //
function payMortgage(id) {
//    console.log(" -payMortgage");
    var nPlayer = aPlayers[0];
    
    if (aoPlayers[nPlayer].credits >= (aoTiles[id].price / 2 * 1.1)) {
        aoTiles[id].mortgage = "no";
        aoPlayers[nPlayer].credits -= Math.round(aoTiles[id].price / 2 * 1.1);
        showAll(id, nPlayer);
    }// player has enough credits to pay mortgage //
    else {
        showDialog('Not enough credits!', 'warning');
    }
}/////////////////////////////////////// PAY OFF MORTGAGE //

function sellAsset(id) {
//    console.log(" -sellAsset");
    var nPlayer = aPlayers[0];

    if (aoTiles[id].assets == 5 && aoTiles[0].bank[1] < 4) {
        var eModalDialog = $('#modalSellDialog');
        eModalDialog.empty()
            .append('<p>The bank doesn\'t have enough houses left to exchange your hotel. You need to sell the hotel in it\'s entirety!</p>')
            .dialog({
                modal: true,
                closeOnEscape: false,
                dialogClass: "no-close",
                buttons: [
                    {
                        text: "Sell for " + aoTiles[id].cost / 2 * 5,
                        click: function() {
                            delete aoTiles[id].assets;
                            aoTiles[0].bank[0] += 1;
                            aoPlayers[nPlayer].credits += aoTiles[id].cost / 2 * 5;
                            showAll(id, nPlayer);
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "Cancel",
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
    }// modal dialog if bank doesn't have enough houses to replace for hotel //
    else {
        if (aoTiles[id].assets >= checkAssets(id) / checkProperties(id)) {
            if (aoTiles[id].assets == 5) {
                aoTiles[0].bank[0] += 1;
                aoTiles[0].bank[1] -= 4;
            }
            else { aoTiles[0].bank[1] += 1; }
            aoTiles[id].assets = aoTiles[id].assets - 1;
            aoPlayers[nPlayer].credits += (aoTiles[id].cost / 2);
            showAll(id, nPlayer);
        }// assets spread out enough to sell here //
        else { showDialog('Your assets have to be spread out more evenly accross your monopoly!', 'warning'); }
    }
    
}///////////////////////////////////////// SELL AN ASSET //
function sellProperty(id) {
//    console.log(" -sellProperty");
    var nPlayer = aPlayers[0];
    var nOwner = aoTiles[id].owner;
    aoPlayers[nOwner].credits += aoTiles[id].price / 2;
    delete aoTiles[id].owner;
    showAll(id, nPlayer);
}/////////////////////////////////////// SELL A PROPERTY //

function getString(string) {
    if (string) { return string; }
    return "";
}////////////////////////////////////// GET STRING //
function shuffleCards(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var card = cards[i];
        cards[i] = cards[j];
        cards[j] = card;
    }
}//////////////////////////////////// SHUFFLE CARDS //
function sortNumber(a,b) { return b - a; }//////////////////////////////////////////////// SORT NUMBERS DESC //