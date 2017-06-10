def valid_word_abbr(word, abbr: str):
    size = len(word)
    cnt = loc = 0
    for w in abbr:
        if w.isdigit():
            if w == '0' and cnt == 0:
                return False
            cnt = cnt * 10 + int(w)
        else:
            loc += cnt
            cnt = 0
            if loc >= size or word[loc] != w:
                return False
            loc += 1
    return loc + cnt == size

if __name__ == '__main__':
    for (word, abbr) in (('internationalization', 'i12iz4n'), ('apple', 'a2e')):
        isValid = valid_word_abbr(word, abbr)
        print('{} {} {}'.format(word, 'YES' if isValid else 'NO', abbr), sep='\n')