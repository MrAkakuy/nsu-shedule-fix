var specs1 = [ // TODO: ??? hardcoded
	{ 
		name: "����",
		fullName: "�������� � ���������� ��������� ���������� -- �����"
	},
	{ 
		name: "����",
		fullName: "���������� ������ � ��������� ������ -- �����"
	},
	{ 
		name: "����",
		fullName: "���������������� �������� ������-������������� -- �����" 
	},
	{ 
		name: "����",
		fullName: "�������� � ������������ ������������ ����������� -- �����" 
	},
	{ 
		name: "����",
		fullName: "������������� ������ ��������� ���������� -- �����" 
	},
	{ 
		name: "���",
		fullName: "������-������������ ��������� -- �����"
	},
	{ 
		name: "������",
		fullName: "����������� ���������������� ����������� ���������������� � ����������������� -- �����" 
	},
	{ 
		name: "�����",
		fullName: "���������� ��������� ��������� �������� ����������� -- �����" 
	},
	{ 
		name: "���",
		fullName: "��������������� ������� ������������ -- �����"
	},
	{ 
		name: "�����",
		fullName: "����������� ����������� ���������������� � ����������������� -- �����" 
	},
	{ 
		name: "����. ���������",
		fullName: "������ ��������� -- �����"
	}
];

var specs2 = [
	{ 
		name: "�������. ����������.",
		fullName: "��������������� ���������������� -- �����" 
	},
	{ 
		name: "��������� ��������.",
		fullName: "��������� ���������������� -- �����" 
	},
	{ 
		name: "�������������",
		fullName: "������������� -- �����" 
	},
	{ 
		name: "�# � �����.NET",
		fullName: "�������� � C# � ���������. NET -- �����" 
	},
	{ 
		name: "����. � ���������",
		fullName: "�������� � ��������� -- �����" 
	},
	{ 
		name: "��������. ���������",
		fullName: "������������� ��������� -- ��������" 
	},
	{ 
		name: "������. �����",
		fullName: "�������������� ����� -- �����" 
	},
	{ 
		name: "������",
		fullName: "�������� � ��������� �������� � ����������� -- �����" 
	}
];


function showError(err) {
	var p = document.createElement("p");
	var font = document.createElement("font");
	font.color = "red";
	font.appendChild(document.createTextNode(err));
	p.appendChild(font);
	document.getElementById("content").appendChild(p);
}

function info(inf) {
	var p = document.createElement("p");
	p.appendChild(document.createTextNode(inf));
	document.getElementById("content").appendChild(p);
}


function saveParams() {
	var choosen = [];

	var all = document.getElementById("specs1").children
	for (var i = 0; i < all.length; ++i) {
		if (all[i].getElementsByTagName("input")[0].checked)
			choosen.push(specs1[i].name);
	}
	var all = document.getElementById("specs2").children
	for (var i = 0; i < all.length; ++i) {
		if (all[i].getElementsByTagName("input")[0].checked)
			choosen.push(specs2[i].name);
	}

	chrome.storage.sync.set({"nsu-shed-specs": choosen.join(",") }, function() {
		if (chrome.runtime.lastError) {
			showError(chrome.runtime.lastError);
			return;
		}
		info("���������: " + choosen.join(", "));
	});
}


function apply() {
	try {
		saveParams();
	}
	catch (err) {
		showError(err);
	}
	return false;
}


document.getElementById("apply").onclick = apply;

var addingFunction = function(elem, i, block) {
	var div = document.createElement("div");

	var checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.value = i.toString();

	var label = document.createElement("label");
	label.for = checkBox.value;
	label.appendChild(document.createTextNode(elem.fullName))

	div.appendChild(checkBox);
	div.appendChild(label);
	document.getElementById(block).appendChild(div);
};

specs1.forEach(function (elem, i) { addingFunction(elem, i, "specs1"); });
specs2.forEach(function (elem, i) { addingFunction(elem, i, "specs2"); });


chrome.storage.sync.get("nsu-shed-specs", function(result) {
    if (!chrome.runtime.error && result["nsu-shed-specs"] != undefined) {
    	var choosen = result["nsu-shed-specs"].split(",");
    	
    	var all = document.getElementById("specs1").children
		for (var i = 0; i < all.length; ++i) {
			var el = all[i].getElementsByTagName("input")[0];
			if (choosen.includes(specs[parseInt(el.value)].name))
				el.checked = true;
		}
		var all = document.getElementById("specs2").children
		for (var i = 0; i < all.length; ++i) {
			var el = all[i].getElementsByTagName("input")[0];
			if (choosen.includes(specs[parseInt(el.value)].name))
				el.checked = true;
		}
    }
});