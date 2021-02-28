import React from "react";
import { Pane, TextInputField, Textarea, Label} from "evergreen-ui";

export const WeekViewForm = (props) => {

  return (
    <Pane display="flex" width={600}>
        <Pane width={500} backgroundColor="white">
            <Pane padding={20}>
            <TextInputField
                label="Länk till inlägg"
                value={props.blogPostUrl}
                onChange={e => props.setBlogPostUrl(e.target.value)}
            />
            </Pane>
            <Pane padding={20}>
            <TextInputField
                label="Länk till bild"
                value={props.imageUrl}
                onChange={e => props.setImageUrl(e.target.value)}
            />
            </Pane>
            <Pane padding={20}>
            <TextInputField
                label="Titel"
                value={props.blogPostTitle}
                onChange={e => props.setBlogPostTitle(e.target.value)}
            />
            </Pane>
            <Pane padding={20}>
            <Label
                htmlFor="textarea-2"
                marginBottom={4}
                display="block"
            >
                Beskrivning
            </Label>
            <Textarea
                name="Text"
                value={props.blogPostDescription}
                onChange={e => props.setBlogPostDescription(e.target.value)}
            />
            </Pane>
        </Pane>
      </Pane>
  );
};
