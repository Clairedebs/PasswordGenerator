export interface PasswordOptions{
    length: number
    includeUppercase: boolean
    includeLowercase: boolean
    includeNumbers: boolean
    includeSymbols: boolean
    excludeSimilars: boolean
}

export function generatePassword(options: PasswordOptions):string{
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const similar = "il1Lo0O";

    let charset = "";

    if(options.includeLowercase) charset += uppercase
    if(options.includeUppercase) charset += lowercase
    if(options.includeNumbers) charset += numbers
    if(options.includeSymbols) charset += symbols

    if(options.excludeSimilars){
        charset = charset
        .split("")
        .filter((char) => !similar.includes(char))
        .join("")
    }

    if (charset === "") return ""
    let password = ""
    for (let i=0; i < options.length; i++){
        password += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    return password
}

export function calcualtePasswordstrength(password: string):{
    score: number
    label: string
    color: string
}{
    let score = 0

  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  const strength = {
    0: { label: "Très faible", color: "bg-red-500" },
    1: { label: "Faible", color: "bg-red-400" },
    2: { label: "Moyen", color: "bg-yellow-500" },
    3: { label: "Bon", color: "bg-yellow-400" },
    4: { label: "Fort", color: "bg-green-400" },
    5: { label: "Très fort", color: "bg-green-500" },
    6: { label: "Excellent", color: "bg-green-600" },
  }

  return {
    score,
    label: strength[score as keyof typeof strength].label,
    color: strength[score as keyof typeof strength].color,
  }
}