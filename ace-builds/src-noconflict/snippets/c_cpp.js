ace.define("ace/snippets/c_cpp", ["require", "exports", "module"], function (require, exports, module) {
	"use strict";

	exports.snippetText = "## STL Collections\n\
# array\n\
snippet array\n\
	array<${1:T}, ${2:N}> ${3};${4}\n\
# vector\n\
snippet vector\n\
	vector<${1:T}> ${2};${3}\n\
# deque\n\
snippet deque\n\
	deque<${1:T}> ${2};${3}\n\
# forward_list\n\
snippet flist\n\
	forward_list<${1:T}> ${2};${3}\n\
# list\n\
snippet list\n\
	list<${1:T}> ${2};${3}\n\
# set\n\
snippet set\n\
	set<${1:T}> ${2};${3}\n\
# map\n\
snippet map\n\
	map<${1:Key}, ${2:T}> ${3};${4}\n\
# multiset\n\
snippet multiset\n\
	multiset<${1:T}> ${2};${3}\n\
# multimap\n\
snippet multimap\n\
	multimap<${1:Key}, ${2:T}> ${3};${4}\n\
# unordered_set\n\
snippet unordered_set\n\
	unordered_set<${1:T}> ${2};${3}\n\
# unordered_map\n\
snippet unordered_map\n\
	unordered_map<${1:Key}, ${2:T}> ${3};${4}\n\
# unordered_multiset\n\
snippet unordered_multiset\n\
	unordered_multiset<${1:T}> ${2};${3}\n\
# unordered_multimap\n\
snippet unordered_multimap\n\
	unordered_multimap<${1:Key}, ${2:T}> ${3};${4}\n\
# stack\n\
snippet stack\n\
	stack<${1:T}> ${2};${3}\n\
# queue\n\
snippet queue\n\
	queue<${1:T}> ${2};${3}\n\
# priority_queue\n\
snippet priority_queue\n\
	priority_queue<${1:T}> ${2};${3}\n\
##\n\
## Input/Output\n\
# cout\n\
snippet cout\n\
	cout << ${1} << endl;${2}\n\
# cin\n\
snippet cin\n\
	cin >> ${1};${2}\n\
# #include\n\
snippet #include\n\
	include\n\
# #define\n\
snippet #define\n\
	define\n\
# <bits/stdc++.h>\n\
snippet <bits/stdc++.h>\n\
	bits/stdc++.h>\n\
##\n\
";
	exports.scope = "c_cpp";

}); (function () {
	ace.require(["ace/snippets/c_cpp"], function (m) {
		if (typeof module == "object" && typeof exports == "object" && module) {
			module.exports = m;
		}
	});
})();
