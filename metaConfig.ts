export const metaConfig = {
  title: './dailyTasks',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '' as any
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
      rel: 'stylesheet'
    },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ],
  meta: [
    {
      name: 'description',
      content:
        'Welcome to ./dailyTasks - your go-to app for managing tasks efficiently and staying organized. Plan, track, and accomplish your daily goals with ease. Explore features designed to boost productivity and streamline your workflow.'
    },
    {
      name: 'keywords',
      content:
        'DailyTasks, Task Management App, Productivity App, Daniel Adeabah, Organize Tasks, Task Planner, To-Do List App, Efficient Task Tracking, Goal Management, Workflow Optimization, Personal Productivity'
    },
    { name: 'author', content: 'Daniel Adeabah' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'robots', content: 'index, follow' },
    { name: 'googlebot', content: 'index, follow' },
    {
      property: 'og:title',
      content: './dailyTasks'
    },
    {
      property: 'og:description',
      content:
        './dailyTasks is your ultimate productivity companion, helping you manage tasks, track progress, and achieve your daily goals effortlessly.'
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://da-dailytasks.vercel.app/' },
    { property: 'og:image', content: 'https://dailytasksapp.com/og-image.jpg' },
    { property: 'twitter:card', content: 'summary_large_image' },
    {
      property: 'twitter:title',
      content: './dailyTasks'
    },
    {
      property: 'twitter:description',
      content:
        'Stay on top of your tasks and boost your productivity with ./dailyTasks - the ultimate task management app.'
    },
    {
      property: 'twitter:image',
      content: 'https://dailytasksapp.com/og-image.jpg'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
}
