export class ErrorParser {
    public static parse(type: string, message: string): string {
        let p1 = "Internal system failure.";

        switch (type) {
            case "Error":
                p1 = "General failure.";
                break;

            case "InternalError":
                p1 = "Internal engine failure.";
                break;

            case "RangeError":
                p1 = "Invalid item range.";
                break;

            case "ReferenceError":
                p1 = "Unable to reference element.";
                break;

            case "SyntaxError":
                p1 = "Syntax failure.";
                break;

            case "TypeError":
                p1 = "Inconsistent element type.";
                break;

            case "SongTooLongError":
                p1 = "Song is too long.";
                break;

            case "URIError":
                p1 = "Resource address parser error.";
                break;

            case "Warning":
                p1 = "Non-critical error.";
                break;
        }

        let p2 = message;

        p2 = p2.replace(/Permission denied to access property (.*)/gm, "The system cannot access the $1 property.")
        p2 = p2.replace(/(.*) is not defined/gm, "The system attempted to access the $1 variable while it is not defined at this point.")
        p2 = p2.replace(/assignment to undeclared variable (.*)/gm, "The system attempted to assign a value to the $1 variable while it is not defined at this point.")
        p2 = p2.replace(/assignment to undeclared variable (.*)/gm, "The system attempted to assign a value to the $1 variable while it is not defined at this point.")
        p2 = p2.replace(/can't access lexical declaration (.*) before initialization/gm, "The system attempted to access the $1 variable while it has not been declared yet.")
        p2 = p2.replace(/reference to undefined property (.*)/gm, "The system attempted to access the $1 property while it is not defined in that object.")
        p2 = p2.replace(/reference to undefined property (.*)/gm, "The system attempted to access the $1 property while it is not defined in that object.")
        p2 = p2.replace(/(.*) has no properties/gm, "The system attempted to access properties of $1 while it doesn't have any.")
        p2 = p2.replace(/(.*) is \(not\) (.*)/gm, "The system attempted to access the $1 variable while it is not the same as $2.")
        p2 = p2.replace(/(.*) is not a constructor/gm, "The system attempted to use $1 as a class constructor while it is not.")
        p2 = p2.replace(/(.*) is not a function/gm, "The system attempted to use $1 as a function or method while it is not.")
        p2 = p2.replace(/(.*) is not a non-null object/gm, "The system attempted to use $1 as an object while it is not null.")
        p2 = p2.replace(/(.*) is read-only/gm, "The system attempted to change $1 while it is read-only.")
        p2 = p2.replace(/(.*) is not iterable/gm, "The system attempted to count iterations of $1 while this is not possible.")
        p2 = p2.replace(/(.*)\.prototype\.(.*) called on incompatible type/gm, "The system attempted to call prototype $2 of class $1 while it is not compatible.")
        p2 = p2.replace(/can't access property (.*) of (.*)/gm, "The system attempted to access property $1 of $2 while that is not possible.")
        p2 = p2.replace(/can't access property (.*) of (.*)/gm, "The system attempted to access property $1 of $2 while that is not possible.")
        p2 = p2.replace(/can't assign to property (.*) on (.*): not an object/gm, "The system attempted to assign a value to property $1 of $2 while $2 is not an object.")
        p2 = p2.replace(/can't define property (.*): (.*) is not extensible/gm, "The system attempted to define a $1 property on $2 while it is not extensible.")

        return p1 + " " + p2;
    }
}