# Informal spec
This spec is for `data.json`

## Compositions
The data will have at its root a `compositions` key with its value being the list of compositions, each with an id.

### Composition
**Keys**  
`composer` (opt) - The composer  
`type` (opt) - The type of composition. Possible values are `"sonata"`, `"nocturne"`, and `null`  
`key` (opt) - The key of the composition. If exists should match `/[A-G](#|b)?m?/`  
`name` (opt) - Name of composition

`audio` - (opt) - Either an array of links to audio files or a string representing the link to an audio file  
`audio_credits` (opt) - Credits  
`audio_credits_link` (opt) - Link to source

#### Sonatas
The following properties are valid if `type` is `"sonata"`

`num` (opt) - The sonata number  
`nickname` (opt) - The nickname  
`movements` (opt) - A list of Sections representing the movements of the sonata

The api will automatically set `name` to `"Piano Sonata No. #{num} \"#{nickname}\""`

## Section
Each Section represents either a whole song or a section of it.

`name` (opt) - The name of the section  
`form` (opt) - The form of the section. Valid values are `"sonata"`, `"scherzo"`, `"rondo"`, and `"minuet"`  