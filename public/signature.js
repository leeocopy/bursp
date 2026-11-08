;(function () {
	const c = window.console.log
	const ua = navigator.userAgent.toLowerCase()
	c && (ua.includes('chrome') || ua.includes('firefox'))
		? c(
				'%c Made by Büro %c %c🤘 %c\n',
				'color:#fff;background:#0020f4;padding:5px 0;',
				'color:#fff;background:#242424;padding:5px 0 5px 5px;',
				'background:#242424;padding:5px 0',
				'background:#242424;padding:5px 5px 5px 0'
		  )
		: c('Made by Büro')
})()
