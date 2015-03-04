<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.IO" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
	<%
	string dbHost = "db567811393.db.1and1.com";
	string dbName = "db567811393";
	string dbUser = "dbo567811393";
	string dbPass = "7Gyuy2tZmtBpumw"; 

	SqlConnection conSql = new SqlConnection("server= "+dbHost+"; database="+dbName+"; uid="+dbUser+"; pwd="+dbPass +";");
	conSql.Open();

	string script = File.ReadAllText(Server.MapPath("saveAll.sql"));

	using (SqlCommand command = new SqlCommand(script, conSql))
	{
		int result = command.ExecuteNonQuery();

		Response.Write("result" + result);
		conSql.Close();
	}
	%>
</body>
</html>
