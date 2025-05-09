export function capitalizer(str)
{
    str = str.toString();
    return str.charAt(0).toUpperCase() + str.substr(1); 
}