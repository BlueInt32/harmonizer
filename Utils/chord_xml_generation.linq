<Query Kind="Program" />

void Main()
{
	List<string> notes = new List<string>{ "c",
"cs",
"df",
"d",
"ds",
"ef",
"e",
"f",
"fs",
"gf",
"g",
"gs",
"af",
"a",
"as",
"bf",
"b"
 };
 
 List<string> chords = new  List<string>{ "maj", "min", "dom7" };
 List<int> durations =  new List<int>{ 1, 2, 4};
 
 foreach (string note in notes)
{
	foreach (string chord in chords)
	{
		foreach (int duration in durations)
		{
			string.Format(@"<add id=""{0}_{1}_{2}"" />", note, chord, duration).Dump();
		}
	}
}
}