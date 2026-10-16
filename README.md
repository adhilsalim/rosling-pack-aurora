# Aurora: a Rosling pack

Northern lights for your talk. **Aurora** is a theme and eight animated templates for
[Rosling](https://github.com/adhilsalim/rosling), the framework where slides are data.
Together they make a complete talk: an opening, chapters, numbers, a quote, a timeline, a chart, a
full-screen photo and a closing slide.

- **A deep night sky.** A near-black navy background, soft green, teal and violet light, and a refined type
  pairing: Manrope for text, Instrument Serif for the big numbers and quotes, JetBrains Mono for small labels.
- **Motion that means something.** Titles rise line by line, numbers count up, bars grow, a timeline draws
  itself. Each slide's entrance plays once; only the aurora itself drifts, slowly.
- **Calm when it should be.** Everything respects *reduce motion* (you see the finished slide straight away),
  and thumbnails and the phone remote always show the final state.
- **Works with any theme.** The templates use the theme's tokens, so they also look right in `core/plain` or
  your own theme, and the core templates look right in the aurora theme.

## Templates

| Template | For | Its entrance |
|---|---|---|
| `aurora/cover` | The opening slide: title, subtitle, speakers; event, date and venue from `deck.json › config` | The aurora unfolds across the sky, title lines rise from below, **bold** words shimmer in the aurora colours |
| `aurora/chapter` | A divider between parts of the talk, with a large number | The number rises out of a mask, a line of light draws down, the title follows line by line |
| `aurora/stat` | One to three numbers people should remember | Each number counts up from zero; one number gets a big hero layout |
| `aurora/quote` | Someone's words, with their name, role and an optional portrait | The quote mark blooms, then the quote appears word by word |
| `aurora/timeline` | A history, a roadmap or a process in two to six steps; one can be "now" | The line draws from left to right and each step appears as the line reaches it |
| `aurora/bars` | A simple bar chart of two to seven values, some highlighted | Bars grow from zero while their values count up and ride along at the bar's end |
| `aurora/spotlight` | One photo or video across the whole slide, with a title and a caption | The picture fades in and slowly drifts closer (a Ken Burns move that plays once) |
| `aurora/closing` | Thank you, contacts, and a link shown as a QR code | Letters rise one by one under the aurora; the QR card lifts into place |

Every template has `light`, `dark` and `accent` variants (`dark` by default). Run `rosling template list --props`
to see each template's boxes and limits, or open the gallery (`#/gallery`) to see them with example values.

## Use it in a deck

```sh
rosling pack add github:adhilsalim/rosling-pack-aurora#v1.0.0
```

Then, in `deck.json`, use the theme:

```json
{ "theme": "aurora/aurora" }
```

and make slides from its templates:

```sh
rosling new opening --template aurora/cover
rosling new results --template aurora/stat --after opening
```

A slide file then looks like any other:

```json
{
  "template": "aurora/stat",
  "values": {
    "title": "The sky is busier than it looks",
    "stats": [
      { "value": 1284, "label": "nights with aurora" },
      { "value": 98.6, "decimals": 1, "suffix": "%", "label": "of alerts sent in time" }
    ]
  }
}
```

You can use the templates without the theme, and the theme without the templates. Mixing them with the core
templates and other packs is fine.

## Try it locally

Clone this repo next to a deck and point the deck at the folder:

```json
{ "packs": { "aurora": "../rosling-pack-aurora" }, "theme": "aurora/aurora" }
```

Then `rosling dev` in the deck. Changes to the pack show up as you save. Before pushing a change, run:

```sh
rosling pack check      # in this folder: it should say "ready to push"
```

## For theme authors

The templates read the standard tokens (`--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--accent-strong`,
`--accent-soft`, `--surface`, `--font`, `--font-mono`, `--footer-h`, `--pad-x`, `--pad-top`). They also read
four optional tokens, and fall back to the standard ones when a theme doesn't set them:

| Token | What it is | Fallback |
|---|---|---|
| `--aurora-a`, `--aurora-b`, `--aurora-c` | The three colours of the lights | shades of `--accent` |
| `--font-display` | The font for big numbers and quotes | `--font` |

So in your own theme the aurora is drawn in your accent colour, unless you set these tokens to choose more.

## Fonts and offline use

The theme loads Manrope, Instrument Serif and JetBrains Mono from Google Fonts. Without a network, the slides
use system fonts instead (system-ui, Georgia, Menlo and the like) and still look right.

## License

MIT, see [LICENSE](LICENSE).
