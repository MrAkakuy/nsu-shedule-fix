function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
    	"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}



var specs = [ // TODO: ??? hardcoded
	"ВРМП","ЛМИЗ","ИСБМ","ВТПО","ТООИ","УМП","ЭПСМиМ","ПАОЦИ","ПВС","АСМиМ","Теор. автоматов",
	"Програм. микроконтр.","Парадигмы программ.","Моделирование","С# и платф.NET","Введ. в профессию","Комбинат. алгоритмы","Информ. поиск","ВвОСиИ"
];


specs.forEach(function (elem) {
	removeLessonEntries(elem);
});


var requiredSpecs = getCookie("nsu-shed-specs");
if (requiredSpecs === undefined)
	requiredSpecs = "";
requiredSpecs = requiredSpecs.split(",");

requiredSpecs.forEach(function (elem) {
	insertLessons(findLessonEntriesFromAllTables(elem));
});