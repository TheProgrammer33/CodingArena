import os
teamName = "nerdAlert"
questionNum = 1
language = "python"
code = "print('hello world')"
path = '/Git/compilers/'
teamPath = '/home/', teamName
if language == "python":
    cmd = "%s > /Git/testPy.txt" % (code)
    os.system(cmd)
    cmd = "/Git/compilers/runPy testPy.txt"
    os.system(cmd)
else:
    print("It didn't work")

errorFile = os.popen('cat /Git/errors.txt')
print(errorFile)
#if len(errorFile) == 0:
#    print("Compiled correctly!!!!")
#else:
#    print("You have errors\n", errorFile)
