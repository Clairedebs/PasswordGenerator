'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { calcualtePasswordstrength, generatePassword, PasswordOptions } from "@/lib/password-generator";
import { IconDice6 } from "@tabler/icons-react";
import { Copy, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner"

export default function PasswordGenerator() {
    const [password, setPassword] = useState("");
    // const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [options, setOptions] = useState<PasswordOptions>({
       length: 16,
       includeLowercase: true,
       includeUppercase: true,
       includeNumbers:true,
       includeSymbols:true,
       excludeSimilars: false
    });
    const handleGenerate = () => {
        const newpassword = generatePassword(options);
        setPassword(newpassword);
    }

    const handleCopy = async () => {
        if (password) {
            await navigator.clipboard.writeText(password)
            toast.success("Password copied to clipboard", {
                description: "You can now paste it wherever you need."
            });
        }
    }

    const strength = password ? 
    calcualtePasswordstrength(password) : null
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 space-y-6 fade-in-50 transition-all duration-500">
            <Card className="shadow-lg w-[] max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">
                        {/* <div className="flex flex-row"> */}
                            {/* <IconDice6Filled className="h-10 w-6 mr-2" />
                            <IconDice1Filled className="h-10 w-6 mr-2 rotate-45 spin-in" /> */}
                            <p>Password Generator</p>
                        {/* </div> */}
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-6">
                    <div className="space-y-2">
                        <Label>Generated password</Label>
                    <div className="lg:flex-row  lg:flex lg:gap-2 items-center space-y-2 lg:space-y-0">
                    <Input
                    value = {password}
                    readOnly
                    placeholder="Click for create a password"
                    className="font-mono text-xl"
                    />
                    <Button 
                    onClick={handleCopy}
                    disabled={!password}
                    size={'icon'}>
                        <Copy className="h-5 w-5" />
                    </Button>
                    <Button 
                    className="mx-2"
                    disabled={!password}
                    size={'icon'}
                    variant={'outline'}>
                        <Save className="h-5 w-5" />
                    </Button>
                    </div>
                    {strength && (
                        <div className="space-y-2">
                            <div className="flex justify-between ">
                                <span>Password Strength</span>
                                <span className="font-mediun">{strength.label}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className={`h-2 rounded-full transition-all ${strength.color}`}
                                style={{ width: `${(strength.score / 6) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Length : {options.length}</Label>
                            <Slider
                            value={[options.length]}
                            onValueChange={([value]) => setOptions((prev) => ({
                                ...prev,
                                length: value
                            }))}
                            min={4}
                            max={32}
                            step={1}
                            className="w-full"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="uppercase">Uppercases (A-Z)</Label>
                                <Switch
                                id="uppercase"
                                checked={options.includeUppercase}
                                onCheckedChange={(checked) => setOptions((prev) => ({
                                    ...prev,
                                    includeUppercase: checked
                                }))} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="lowercase">Lowercases (a-z)</Label>
                                <Switch
                                id="lowercase"
                                checked={options.includeLowercase}
                                onCheckedChange={(checked) => setOptions((prev) => ({
                                    ...prev,
                                    includeLowercase: checked
                                }))} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="numbers">Numbers (0-9)</Label>
                                <Switch
                                id="numbers"
                                checked={options.includeNumbers}
                                onCheckedChange={(checked) => setOptions((prev) => ({
                                    ...prev,
                                    includeNumbers: checked
                                }))} />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="symbols">Symbols (!@#$)</Label>
                                <Switch
                                id="symbols"
                                checked={options.includeSymbols}
                                onCheckedChange={(checked) => setOptions((prev) => ({
                                    ...prev,
                                    includeSymbols: checked
                                }))} />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="exclude-similars">Exclude Similar Characters (i, l, 1, L, o, 0, O)</Label>
                            <Switch
                                id="exclude-similars"
                                checked={options.excludeSimilars}
                                onCheckedChange={(checked) => setOptions((prev) => ({
                                    ...prev,
                                    excludeSimilars: checked
                                }))} />
                        </div>
                    </div>
                    <Button
                    onClick={handleGenerate}
                    className="w-full"
                    size={'lg'}>
                        <IconDice6 className="h-5 w-5 mr-2 rotate-45 hover:spin-out" />
                        Generate Password
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}