import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Building2, User, FileText, Coins, Plus, Trash2, Wallet } from "lucide-react";
import depeerLogo from "@/assets/depeer-logo.png";

const STEPS = ["Account", "Company", "Directors", "Token Intent", "Compliance"];
const SECTORS = ["Agriculture", "Technology", "Financial Services", "Transport & Logistics", "Tourism", "Energy", "Manufacturing", "Retail", "Healthcare", "Education"];
const FUNDING_STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Bootstrapped", "Revenue-Funded"];
const COUNTRIES = ["Kenya", "Nigeria", "Ghana", "Tanzania", "South Africa", "Uganda", "Rwanda", "Ethiopia", "Senegal", "Egypt"];

interface Director {
  full_name: string;
  id_number: string;
  nationality: string;
  role_title: string;
  email: string;
}

const emptyDirector: Director = { full_name: "", id_number: "", nationality: "", role_title: "", email: "" };

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("investor");
  const [step, setStep] = useState(0);

  /* investor fields */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  /* company fields */
  const [companyName, setCompanyName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [sector, setSector] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [revenueCurrency, setRevenueCurrency] = useState("USD");
  const [fundingStage, setFundingStage] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  /* directors */
  const [directors, setDirectors] = useState<Director[]>([{ ...emptyDirector }]);

  /* token intent */
  const [tokenType, setTokenType] = useState("");
  const [tokenSupply, setTokenSupply] = useState("");
  const [pricePerToken, setPricePerToken] = useState("");
  const [backingDescription, setBackingDescription] = useState("");

  /* compliance */
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptKYB, setAcceptKYB] = useState(false);
  const [acceptRisk, setAcceptRisk] = useState(false);

  const handleInvestorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/investor");
  };

  const handleBusinessRegister = () => {
    navigate("/business");
  };

  const addDirector = () => setDirectors([...directors, { ...emptyDirector }]);
  const removeDirector = (i: number) => setDirectors(directors.filter((_, idx) => idx !== i));
  const updateDirector = (i: number, field: keyof Director, value: string) => {
    const updated = [...directors];
    updated[i] = { ...updated[i], [field]: value };
    setDirectors(updated);
  };

  const totalSteps = STEPS.length;
  const canNext = () => {
    if (step === 0) return email && password && firstName && lastName;
    if (step === 1) return companyName && regNumber && country && city && sector && foundedYear && employeeCount && annualRevenue && fundingStage && description;
    if (step === 2) return directors.every((d) => d.full_name && d.id_number && d.nationality && d.role_title && d.email);
    if (step === 3) return tokenType && tokenSupply && pricePerToken && backingDescription;
    if (step === 4) return acceptTerms && acceptKYB && acceptRisk;
    return true;
  };

  /* ── Investor form (simple) ── */
  if (role === "investor") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5" onClick={() => navigate(-1)}>
              <ArrowLeft size={16} /> Back
            </Button>
          </div>
          <div className="text-center mb-8">
            <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-10 mx-auto" /></Link>
            <p className="text-muted-foreground mt-2 text-sm">Create your account</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <RoleToggle role={role} setRole={setRole} />

            <form onSubmit={handleInvestorRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-foreground font-medium text-xs">First Name</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground" />
                </div>
                <div>
                  <Label className="text-foreground font-medium text-xs">Last Name</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground" />
                </div>
              </div>
              <div>
                <Label className="text-foreground font-medium text-xs">Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <Label className="text-foreground font-medium text-xs">Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground" />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Create Account
              </Button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or</span></div>
            </div>

            <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
              <Wallet size={18} className="mr-2" /> Connect TON Wallet
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Business form (multi-step) ── */
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Back
          </Button>
        </div>
        <div className="text-center mb-6">
          <Link to="/"><img src={depeerLogo} alt="DePeer" className="h-10 mx-auto" /></Link>
          <p className="text-muted-foreground mt-2 text-sm">Register your business</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
          <RoleToggle role={role} setRole={(r) => { setRole(r); setStep(0); }} />

          {/* Progress */}
          <div className="flex items-center gap-1 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center gap-1.5">
                <div className={`h-1.5 w-full rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-muted"}`} />
                <span className={`text-[10px] font-medium hidden sm:block ${i <= step ? "text-accent" : "text-muted-foreground"}`}>{s}</span>
              </div>
            ))}
          </div>

          {/* Step 0: Account */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2"><User size={18} /> Account Details</h2>
              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name" value={firstName} onChange={setFirstName} placeholder="Jane" />
                <Field label="Last Name" value={lastName} onChange={setLastName} placeholder="Doe" />
              </div>
              <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@company.com" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+254 700 000 000" />
              <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
            </div>
          )}

          {/* Step 1: Company */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2"><Building2 size={18} /> Company Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Company Name" value={companyName} onChange={setCompanyName} placeholder="Nala Logistics Ltd" />
                <Field label="Registration Number" value={regNumber} onChange={setRegNumber} placeholder="PVT-12345678" />
                <SelectField label="Country" value={country} onChange={setCountry} options={COUNTRIES} placeholder="Select country" />
                <Field label="City" value={city} onChange={setCity} placeholder="Nairobi" />
                <SelectField label="Sector" value={sector} onChange={setSector} options={SECTORS} placeholder="Select sector" />
                <Field label="Founded Year" type="number" value={foundedYear} onChange={setFoundedYear} placeholder="2019" />
                <Field label="Employees" type="number" value={employeeCount} onChange={setEmployeeCount} placeholder="45" />
                <SelectField label="Funding Stage" value={fundingStage} onChange={setFundingStage} options={FUNDING_STAGES} placeholder="Select stage" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Field label="Annual Revenue" type="number" value={annualRevenue} onChange={setAnnualRevenue} placeholder="1440000" />
                </div>
                <SelectField label="Currency" value={revenueCurrency} onChange={setRevenueCurrency} options={["USD", "KES", "NGN", "GHS", "TZS", "ZAR"]} placeholder="USD" />
              </div>
              <Field label="Website (optional)" value={website} onChange={setWebsite} placeholder="https://nalalogistics.co.ke" />
              <div>
                <Label className="text-foreground font-medium text-xs">Business Description</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe what your business does, its market position, and growth plans..." className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground min-h-[100px]" />
              </div>
            </div>
          )}

          {/* Step 2: Directors */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold text-lg flex items-center gap-2"><FileText size={18} /> Directors & Key Personnel</h2>
                <Button type="button" variant="outline" size="sm" onClick={addDirector} className="text-xs">
                  <Plus size={14} className="mr-1" /> Add Director
                </Button>
              </div>
              {directors.map((d, i) => (
                <div key={i} className="rounded-xl border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Director {i + 1}</span>
                    {directors.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeDirector(i)} className="text-destructive h-7 px-2">
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Full Name" value={d.full_name} onChange={(v) => updateDirector(i, "full_name", v)} placeholder="Jane Doe" />
                    <Field label="ID / Passport Number" value={d.id_number} onChange={(v) => updateDirector(i, "id_number", v)} placeholder="A1234567" />
                    <Field label="Nationality" value={d.nationality} onChange={(v) => updateDirector(i, "nationality", v)} placeholder="Kenyan" />
                    <Field label="Role / Title" value={d.role_title} onChange={(v) => updateDirector(i, "role_title", v)} placeholder="CEO" />
                  </div>
                  <Field label="Email" type="email" value={d.email} onChange={(v) => updateDirector(i, "email", v)} placeholder="jane@company.com" />
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Token Intent */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2"><Coins size={18} /> Token Issuance Intent</h2>
              <p className="text-sm text-muted-foreground">Tell us about the tokens you plan to issue. This will be reviewed before listing.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <SelectField label="Token Type" value={tokenType} onChange={setTokenType} options={["Revenue", "Asset", "Equity"]} placeholder="Select type" />
                <Field label="Total Supply" type="number" value={tokenSupply} onChange={setTokenSupply} placeholder="1000" />
                <Field label="Price per Token ($)" type="number" value={pricePerToken} onChange={setPricePerToken} placeholder="15.00" />
              </div>
              <div>
                <Label className="text-foreground font-medium text-xs">Backing Description</Label>
                <Textarea value={backingDescription} onChange={(e) => setBackingDescription(e.target.value)} placeholder="Describe what backs this token — e.g. monthly revenue share of 5%, warehouse asset at 123 Industrial Rd, or 10% equity stake..." className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground min-h-[100px]" />
              </div>
              {tokenType && (
                <div className="rounded-xl bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
                  {tokenType === "Revenue" && "Revenue tokens entitle holders to a share of periodic business revenue."}
                  {tokenType === "Asset" && "Asset tokens represent fractional ownership of a specific business asset."}
                  {tokenType === "Equity" && "Equity tokens represent ownership stake in the business entity."}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Compliance */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-lg">Compliance & Declarations</h2>
              <p className="text-sm text-muted-foreground">Please review and accept the following declarations to complete your registration.</p>

              <ComplianceCheck checked={acceptTerms} onChange={setAcceptTerms} label="I agree to the DePeer Terms of Service and Privacy Policy. I understand that my business information will be reviewed before tokens can be listed." />
              <ComplianceCheck checked={acceptKYB} onChange={setAcceptKYB} label="I confirm that all information provided is accurate and truthful. I understand that providing false information may result in account suspension and legal action." />
              <ComplianceCheck checked={acceptRisk} onChange={setAcceptRisk} label="I acknowledge the risks associated with token issuance and understand that DePeer does not guarantee token sales or returns to investors." />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={() => setStep(step - 1)} className="text-muted-foreground">
                <ArrowLeft size={16} className="mr-1" /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < totalSteps - 1 ? (
              <Button type="button" onClick={() => setStep(step + 1)} disabled={!canNext()} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Next <ArrowRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button type="button" onClick={handleBusinessRegister} disabled={!canNext()} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Submit Application
              </Button>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Reusable sub-components ── */

const RoleToggle = ({ role, setRole }: { role: string; setRole: (r: string) => void }) => (
  <div className="grid grid-cols-2 gap-3 mb-6">
    {[
      { value: "investor", label: "Investor", desc: "Browse and invest in tokens" },
      { value: "business", label: "Business", desc: "Tokenise your business" },
    ].map((r) => (
      <button
        key={r.value}
        onClick={() => setRole(r.value)}
        className={`rounded-xl p-3 sm:p-4 text-left transition-all border ${
          role === r.value ? "border-accent bg-accent/10" : "border-border hover:border-muted-foreground/30"
        }`}
      >
        <div className={`font-display font-semibold text-sm ${role === r.value ? "text-accent" : "text-foreground"}`}>{r.label}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
      </button>
    ))}
  </div>
);

const Field = ({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) => (
  <div>
    <Label className="text-foreground font-medium text-xs">{label}</Label>
    <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1 bg-muted/50 border-input text-foreground placeholder:text-muted-foreground" />
  </div>
);

const SelectField = ({ label, value, onChange, options, placeholder }: { label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string }) => (
  <div>
    <Label className="text-foreground font-medium text-xs">{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="mt-1 bg-muted/50 border-input text-foreground">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const ComplianceCheck = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
  <div className="flex items-start gap-3 rounded-xl border border-border p-4">
    <Checkbox checked={checked} onCheckedChange={(v) => onChange(v === true)} className="mt-0.5" />
    <span className="text-sm text-foreground leading-relaxed">{label}</span>
  </div>
);

export default Register;
