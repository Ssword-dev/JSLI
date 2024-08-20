@echo off
echo "CommandLine Args:" 
echo %*
::region::findHelp::
for %%f in (%*) do (
    if "%%f"== "--help" (
        echo "--d : (config flag) Debug mode. Shows what the compiler is transforming and what it transforms into"
        echo "--m : Minify (config flag) Tells the compiler to minify the code"
        echo "--help : (utility flag) Shows this help page and exits"
        exit /b 0
    )
)
::endregio ::findHelp::
set SCHEMA=%1
set TARGET=%2

node ./schemaParse-jsx.js "%1" "%2" %*