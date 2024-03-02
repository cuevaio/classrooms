type Event = { host?: string; isCourse: boolean } & (
  | {
      isCourse: true;
      course: {
        code?: string;
        name: string;
        section?: number;
        type?: string;
        group?: number;
      };
    }
  | { name: string; isCourse: false }
);

/**
 * Parses a string representing an event into an Event object.
 * @param event - The string representing the event to be parsed.
 * @returns An Event object representing the parsed event.
 */
export function parseEvent(event: string): Event {
  // Initialize variables to hold parsed data
  let host: string | undefined;
  let name = event.replace(/^:/, "").replace(/--/g, "-");

  // If the event includes "ExF", it's considered a course event
  if (name.includes("ExF")) {
    // If it also includes "Teoría", it's a theory course event
    if (name.includes("Teoría")) {
      const parts = name.split("Teoría");
      name = parts[0].replace("ExF", "").trim().slice(0, -1).trim();
      // Extract course details and return the parsed event object
      return {
        course: {
          name,
          group: undefined,
          section: parseInt(parts[1].trim()),
          type: "TEO",
        },
        host: undefined,
        isCourse: true,
      };
    } else {
      // If it doesn't include "Teoría", it's a general course event
      name = name.replace("ExF", "").trim();
      // Extract course details and return the parsed event object
      return {
        course: {
          name,
          group: undefined,
          section: undefined,
          type: "TEO",
        },
        host: undefined,
        isCourse: true,
      };
    }
  }

  // If the event includes " - ", it's considered a non-course event
  if (name.includes(" - ")) {
    const parts = name.split(" - ");

    // If the event has 5 parts, it includes detailed course information
    if (parts.length === 5) {
      let [course, section, type, group, hostName] = parts;
      let [code, courseName] = course.split("-");
      name = courseName.trim();
      host = hostName.replace("Docente", "").trim();
      code = code.trim();
      let parsedGroup: number | undefined = undefined;

      // Parse group number if it includes a dot or not
      if (group.includes(".")) {
        const [_, groupNum] = group.split(".");
        parsedGroup = parseInt(groupNum);
      } else {
        parsedGroup = parseInt(group.replace("Grupo", "").trim());
      }

      // Extract course details and return the parsed event object
      return {
        course: {
          code,
          name,
          section: parseInt(section.replace("Sec.", "").trim()),
          type,
          group: parsedGroup,
        },
        host: host === "" ? undefined : host,
        isCourse: true,
      };
    }

    // If the event has 2 parts, it's a general non-course event
    if (parts.length === 2) {
      const [eventName, hostName] = parts;
      name = eventName.trim();
      host = hostName.trim();

      // Return the parsed non-course event object
      return {
        name,
        host,
        isCourse: false,
      };
    }
  }

  // If the event doesn't match any specific pattern, treat it as a non-course event
  return {
    name: name.trim(),
    host: undefined,
    isCourse: false,
  };
}
