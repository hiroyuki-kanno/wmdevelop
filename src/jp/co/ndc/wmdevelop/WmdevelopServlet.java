package jp.co.ndc.wmdevelop;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class WmdevelopServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {

		String encoding = "UTF-8";

		resp.setCharacterEncoding(encoding);
		resp.setContentType("text/plain;charset=" + encoding);
		resp.getWriter().println("WM開発チームの演習用サイトです。");
	}
}
