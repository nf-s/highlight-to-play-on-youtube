window_open = 0

function setWindowId(window){
        window_open = window.id;
}

function openWindow(searchText) {
        if(window_open == 0) {
                chrome.windows.create({'url': 'search.html?search='+searchText, 'type': 'popup', 'width': 650, 'height': 395}, setWindowId);
        } else {
                chrome.windows.remove(window_open);
                chrome.windows.create({'url': 'search.html?search='+searchText, 'type': 'popup', 'width': 650, 'height': 395}, setWindowId);
        }
}

chrome.contextMenus.create({title: "Play %s", contexts:["selection"], 
        onclick: function(info, tab){ 
                openWindow(info.selectionText);
        }
});

chrome.contextMenus.create({title: "Play %s Trailer", contexts:["selection"], 
        onclick: function(info, tab){ 
                openWindow(info.selectionText+" Trailer");
        }
});