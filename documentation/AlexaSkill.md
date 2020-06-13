# Alexa Skill

# openID callbacks

replace the placeholder value <VID> in these URLs with your vendor ID (which you should find in your Scratch-Pad): 

```sh
https://alexa.amazon.co.jp/api/skill/link/<VID>
https://layla.amazon.com/api/skill/link/<VID>
https://pitangui.amazon.com/api/skill/link/<VID>
  ```
  
Note: These three URLs correspond to the three Alexa regions: FE (co.jp), EU (layla), NA (pitangui). 

Combine them into a single comma-seperated value. For example, if your vendor ID is M12AB34CD56EF7, the result would be:

```sh
https://alexa.amazon.co.jp/api/skill/link/M12AB34CD56EF7,https://layla.amazon.com/api/skill/link/M12AB34CD56EF7,https://pitangui.amazon.com/api/skill/link/M12AB34CD56EF7
```

## Supported regions

- us-east-1 (N. Virginia)
- us-west-2 (Oregon)
- eu-west-1 (Ireland)
- ap-northeast-1 (Tokyo)
