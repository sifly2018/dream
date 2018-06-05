'use strict'

var LetterItem = function(text){
    if(text){
        var obj = JSON.parse(text);
        this.title = obj.title;
        this.content = obj.content;
		this.name = obj.name;
        this.author = obj.author;
    }
};

LetterItem.prototype = {
    toString : function(){
        return JSON.stringify(this)
    }
};

var TheLetter = function () {
    LocalContractStorage.defineMapProperty(this, "data", {
        parse: function (text) {
            return new LetterItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

TheLetter.prototype ={
    init:function(){
        
    },

    save:function(title,content,name){
        if(!title || !content|| !name){
            throw new Error("empty title or content")
        }

        if(title.length > 20 || content.length > 500){
            throw new Error("title or content  exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var letterItem = this.data.get(name);
        if(letterItem){
            throw new Error("letter has been occupied");
        }

        letterItem = new LetterItem();
        letterItem.author = from;
        letterItem.title = title;
        letterItem.content = content;
        letterItem.name = name;
        this.data.put(name,letterItem);
    },

    get:function(name){
        if(!name){
            throw new Error("empty name")
        }
        return this.data.get(name);
    }
}

module.exports = TheLetter;