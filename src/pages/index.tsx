import titleCase from 'lodash/startCase'
import * as Emails from '~/emails'

type HomeProps = {
  projects: Record<string, string[]>
}

export default function Home(props: HomeProps) {
  const { projects } = props

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ marginBottom: 16 }}>Welcome to Email Builder!</h1>

      <p style={{ marginBottom: 16 }}>Please choose from the following list of available emails</p>

      {Object.keys(projects).map((projectName) => {
        if (!projects[projectName].length) return null
        return (
          <div key={projectName}>
            <h2>{titleCase(projectName)}</h2>
            <ul>
              {projects[projectName].map((emailComponentName) => (
                <li key={emailComponentName}>
                  <a href={`/preview?componentName=${emailComponentName}`}>{emailComponentName}</a>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export async function getServerSideProps(): Promise<{ props: HomeProps }> {
  const emailComponentNames = Object.keys(Emails)

  const projects: Record<string, string[]> = { root: [] }

  emailComponentNames.forEach((emailComponentName) => {
    if (emailComponentName.endsWith('_SampleData')) return

    const match = emailComponentName.match(/(.+)_.+/)

    if (match) {
      const projectName = match[1]
      if (!projects[projectName]) projects[projectName] = []
      projects[projectName].push(emailComponentName)
    } else {
      if (!projects.noProject) projects.noProject = []
      projects.noProject.push(emailComponentName)
    }
  })

  return { props: { projects } }
}
