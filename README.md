# Email Builder

Write React code that compiles into the HTML email templates that you copy-paste into SendGrid (or anywhere else).

Everything about how you send emails stays exactly the same, but you can stop hacking together `<table>`s in the SendGrid online editor and then praying that they look the same in every email client that your customers use to view your emails.

## Objective

Email Builder is a "development environment" to make it easier to create beautiful email templates:

- Write emails once with a guarantee that they will look identical in every email client
- **NEVER WRITE ANOTHER LAYOUT TABLE**
- A live preview that updates as you edit the template
- True mobile responsiveness
- Extract reusable email components to share between different email templates (reusable email layouts too!)
- Strongly typed handlebar templates
- One click to copy email HTML output
- Put all Email Builder in one place, making it easier to see what other teams are doing and share reusable email components
- Add source control around email templates
- Write email code in your IDE instead of a web client (e.g. sendgrid)
- Code generation scripts to get your email off the ground quickly with ZERO copy & paste

This project outputs HTML email templates that are guaranteed to look identical in every email client, that you can copy-paste into SendGrid or anywhere else that supports handlebars template strings.

## Getting Started

**Do not** start by copying-and-pasting another project or another email. Instead use the `hygen` scripts below to ensure that everything is bootstrapped correctly. Once the email file has been generated (i.e. you've run `pnpm hygen new email`), _then_ you can copy-paste the React code from a different email if you so choose.

```bash
# Launch the dev server
pnpm run dev

# Init a new project (if your team doesn't have emails stored here yet)
pnpm hygen new project

# ...or add to an existing project
pnpm hygen new email
```

Now just open [localhost:3000](http://localhost:3000) in your browser and click on the email you'd like to preview.

## Learning MJML

In order to create these emails you're going to have to learn the basics of MJML. It's not overly complicated, but it is quite different than HTML in that it has kind of a lot of rules. You'll want to refer to its [docs](https://documentation.mjml.io/), which are actually pretty good.

But here is a quick and dirty 30 second version of MJML:

1. MJML has a very specific hierarchy and will error if you break the hierarchy

   ```
   <Mj.Ml>
     └── <Mj.Head>
     └── <Mj.Body>
       └── <Mj.Wrapper>
       └── <Mj.Section>
         └── <Mj.Column>
           └── <Mj.Text>
           └── <Mj.Button>
           └── <Mj.Image>
           └── <Mj.Divider>
           └── <Mj.Title>
           └── etc.
   ```

   - Mj.Section's can go inside an Mj.Wrapper or inside the Mj.Body
   - Mj.Section's **must** contain one or more Mj.Column's
   - All of the content elements (Mj.Text, Mj.Button, Mj.Image, etc.) **must** go inside of an Mj.Column

1. **DO NOT WRITE YOUR OWN CSS**

   The whole purpose of MJML is to allow you to write the email once, and compile it into an HTML template that is guaranteed to work in _every_ email client.

   If you write your own CSS, it will more than likely break all or some email clients. Testing in gmail is not enough to guarantee this email isn't broken for our customers.

   Instead, use the various styling attributes that are available to you on MJML elements.
   Different styling attributes are available on different tags; I would start by looking through mj-section, mj-column, and mj-text.

## Injecting data

We're making email templates here that are intended to contain placeholders for real user data that gets injected before the email is sent. This project handles that with a `<Placeholder>` component:

```tsx
import { Placeholder, getPlaceholderPaths } from '~/lib'
import sampleData from './my-email.data'

// Determine the dot notation paths for each sample data property
const paths = getPlaceholderPaths(sampleData)

// `paths` has the same shape as sampleData
// It's strongly typed and will auto-complete
<Placeholder path={paths.foo.bar} />
```

Now the handlebars template string `{{foo.bar}}` will be present in the exported HTML and `sampleData.foo.bar` will be displayed in the browser preview.

> An example placeholder and example sample data are both automatically generated for you when you use the code generation scripts built into this this tool to scaffold your email template! All you have to do is add properties to the generated `.data.ts` file.

> If you need the handlebar template as a string instead of as a React component (e.g. to pass as an image src), you can use the `pathToValue()` function.

### Each

If you need to iterate over an array of placeholder data, you can use the `<Each>` component to generate the handlebars `{{#each}}` syntax.

```tsx
import { Each, getPlaceholderPaths } from '~/lib'
import {Mj} from '~/components'

// {body: ['Paragraph 1', 'Paragraph 2']}
import sampleData from './my-email.data'

const paths = getPlaceholderPaths(sampleData)

<Each path={paths.body}>{(paragraph) => <Mj.Text>{paragraph}</Mj.Text>}</Each>
```

### Conditional Rendering

If you need to conditionally render a section based on the presence or absence of some placeholder data, you can use the `<If>` component to generate the handlebars `{{#if}}` syntax.

```tsx
import { If, getPlaceholderPaths } from '~/lib'
import {Mj} from '~/components'

// {foo: {bar: 'Hello, world!'}}
import sampleData from './my-email.data'

const paths = getPlaceholderPaths(sampleData)

// Notice that even though `sampleData.foo` is an object,
// you can use it as a valid path here.
<If path={paths.foo}>
  <Mj.Text>
    <Placeholder path={paths.foo.bar} />
  </Mj.Text>
</If>
```

#### Complex Conditional Rendering

You can also perform more complex conditional checks:

<!-- prettier-ignore -->
```tsx
<Mj.Text>
  <If path={paths.foo} and={paths.bar}>
    Foo and bar both exist
  <Else if={paths.baz} />
    Baz exists
  <Else />
    Neither of the previous two conditions, "if(foo && bar)" 
    nor "if(baz)", were met
  </If>
</Mj.Text>
```

> The React structure of the above code is a bit confusing. In React terms it puts both `<Else>` statements as children of the `<If>`, even though logically they are at the same level. It also treats the content that comes immediately after `<Else>` as its "children", even though the JSX is not nested.
>
> You'll notice though that this JSX structure mirrors the structure of the output Handlebars template below.

The above will result in this output template:

<!-- prettier-ignore -->
```html
<p>
  {{#if (and foo bar)}}
    Foo and bar both exist
  {{else if baz}}
    Baz exists
  {{else}}
    Neither of the previous two conditions, "if(foo && bar)" 
    nor "if(baz)", were met
  {{/if}}
</p>
```

## Available code generation scripts

This project provides scripts to automatically scaffold new projects, email templates, and shared email components for you. This helps avoid copy-paste mistakes and lets you get up and running faster. It is **HIGHLY** recommended that you take advantage of these scripts instead of going the copy-paste route, lest you fall victim to the unusual naming conventions that this project institutes.

These scripts are written using a tool called [hygen](https://www.hygen.io/). They can be run with `pnpm hygen <script>`, or if you install the tool globally (`npm i -g hygen`), then you can run `hygen` directly without pnpm.

#### `pnpm hygen new project`

Initialize a new project to add emails to. Skip this if you or someone else has already added emails here for your project/team (meaning that a folder exists for your project in `src/emails`). In addition to the project folder, this command will also generate your first email template for you.

#### `pnpm hygen new email`

Add a new email template to an existing project. This also includes a sample data file that allows you to use the `<Placeholder>` component to generate handlebars placeholders.

#### `pnpm hygen new component`

Generate a new email shared component that can be shared between multiple email templates and even between different projects & teams!

## A note on naming conventions

If you look around the `src/emails` directory, you might notice that the emails use an unconventional naming convention with underscores; `ProjectName_EmailName`. And the sample data files get even weirder with `ProjectName_EmailName_SampleData`.

The reason for this odd choice is that we need to be able to import each email template React Component and each sample data object individually from within the `src/emails` directory on command in order to render the correct preview.

An attempt was made to remove the need for this naming convention by using dynamic `require()` calls and the file system folder structure, but the Next.js compilation process makes this troublesome (impossible?). My best guess as to what's happening is that even on the "server" side Next only includes files that it detects have been imported by files. So when you try to dynamically require a file that is not explicitly imported, it fails (adding a `*` import and then using a dynamic require was also tried and didn't appear to work either).

## Technology choices

- [MJML](https://mjml.io/): Guarantee that the output email HTML will look identical in every email provider, and simplify the creation of mobile responsive emails
- [mjml-react](https://www.npmjs.com/package/mjml-react): By bringing MJML to React, we gain the ability to create shared email components
- [Next.js](https://nextjs.org/): We take advantage of Next's dev mode to render the preview, and its built in API to generate the needed HTML
- [Hygen](https://www.hygen.io/): An awesome framework for quickly building code generation scripts

## Todo

- Create a build script that writes all compiled email html to `dist/`
- Perhaps figure out a way to automatically upload built email html templates to sendgrid?
- Possibly figure out a smarter way to re-render the email than doing so on a timer
  - Maybe monitor the `src/emails` directory for changes and then add and remove a new line from `src/pages/api/generate-email-html.tsx` to trigger Next to do a Fast Reload
