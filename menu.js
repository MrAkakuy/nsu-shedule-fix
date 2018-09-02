var specs = [ // TODO: ??? hardcoded
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

	var all = document.getElementById("specs").children
	for (var i = 0; i < all.length; ++i) {
		if (all[i].getElementsByTagName("input")[0].checked)
			choosen.push(specs[i].name);
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

specs.forEach(function (elem, i) {
	var div = document.createElement("div");

	var checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.value = i.toString();

	var label = document.createElement("label");
	label.for = checkBox.value;
	label.appendChild(document.createTextNode(elem.fullName))

	div.appendChild(checkBox);
	div.appendChild(label);
	document.getElementById("specs").appendChild(div);
});


chrome.storage.sync.get("nsu-shed-specs", function(result) {
    if (!chrome.runtime.error && result["nsu-shed-specs"] != undefined) {
    	var choosen = result["nsu-shed-specs"].split(",");
    	
    	var all = document.getElementById("specs").children
		for (var i = 0; i < all.length; ++i) {
			var el = all[i].getElementsByTagName("input")[0];
			if (choosen.includes(specs[parseInt(el.value)].name))
				el.checked = true;
		}
    }
});