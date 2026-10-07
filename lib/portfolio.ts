export type GhostTerminalEntry = {
  command: string;
  output: string[];
};

export const ghostTerminalEntries: GhostTerminalEntry[] = [
  {
    command: "whoami --focus",
    output: [
      "Student: Lyna Selmani (4th Year CS @ ESTIN)",
      "Focus: Infrastructure & IPC Security · Full-Stack Systems",
      "Availability: Open for Security & Dev Internships",
    ],
  },
  {
    command: "cat /etc/core-stack.txt",
    output: [
      "FastAPI Python Docker PostgreSQL Next.js TypeScript Electron Burp Suite",
    ],
  },
  {
    command: "python3 audit_runtime_ipc.py",
    output: [
      "[*] Initializing memory defense & IPC monitor...",
      "[*] Verifying Unix domain socket permissions: chmod 0600 enforced",
      "[*] Auditing Docker container isolation & seccomp profile",
      "[*] Inspecting TLS 1.3 cryptographic suites & cipher integrity",
      "[+] Security Audit PASSED. System Integrity: 100% SECURE",
    ],
  },
  {
    command: "node sysinfo.json",
    output: [
      '"institution": "ESTIN Higher School of Computer Science"',
      '"year": "4th Year (Engineering & Master)"',
      '"specialization": "Cybersecurity & Systems Engineering"',
      '"kernel": "Linux 6.x hardened (cgroups v2, seccomp)"',
      '"security_focus": ["Inter-Process Communication (IPC) Analysis", "Container Isolation & Docker Defense", "FastAPI & PostgreSQL Backend Security"]',
    ],
  },
];
