/**
 * Created by sabir on 02.08.16.
 */

var CoavtorHelper = {

    TAGS_NAME_MAP: {
        literature: 'Литература',
        music: 'Музыка',
        invention: 'Изобретательство',
        jokes: 'Анекдоты',
        other: 'Другое'
    },

    getTagsList: function(){
        var arr = [];
        var map = this.TAGS_NAME_MAP;
        for (var key in map){
            arr.push({
                name: key,
                displayName: map[key]
            });
        }
        return arr;
    }

};

module.exports = CoavtorHelper;